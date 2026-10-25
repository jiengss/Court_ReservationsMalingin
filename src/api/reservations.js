import { supabase } from '../lib/supabase.js';

// ─── SCHEDULE (public) ────────────────────────────────────────────────
/**
 * Fetch all non-cancelled reservations for the next 30 days (or a specific date).
 * Returns objects shaped like the old Laravel /schedule response.
 */
export const fetchSchedule = async (date = null) => {
  let query = supabase
    .from('reservations')
    .select('id, user_id, activity_type, reservation_date, start_time, end_time, status, notes')
    .neq('status', 'cancelled')
    .order('reservation_date', { ascending: true })
    .order('start_time', { ascending: true });

  if (date) {
    query = query.eq('reservation_date', date);
  } else {
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    query = query.gte('reservation_date', today).lte('reservation_date', maxDate);
  }

  const { data, error } = await query;
  if (error) throw error;

  // Get current user to mark is_mine
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  return (data || []).map(res => ({
    ...res,
    is_mine: userId ? res.user_id === userId : false,
  }));
};

// ─── USER RESERVATIONS ─────────────────────────────────────────────────
/**
 * Fetch reservations belonging to the currently authenticated user.
 */
export const fetchUserReservations = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('user_id', user.id)
    .order('reservation_date', { ascending: true })
    .order('start_time', { ascending: true });

  if (error) throw error;
  return data || [];
};

// ─── CREATE RESERVATION ────────────────────────────────────────────────
/**
 * Create a new reservation with overlap check.
 */
export const createReservation = async (formData) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Check for overlapping reservations
  const { data: conflicts } = await supabase
    .from('reservations')
    .select('id, activity_type, start_time, end_time')
    .eq('reservation_date', formData.reservation_date)
    .neq('status', 'cancelled')
    .lt('start_time', formData.end_time)
    .gt('end_time', formData.start_time);

  if (conflicts && conflicts.length > 0) {
    const overlap = conflicts[0];
    const startTime = overlap.start_time.slice(0, 5);
    const endTime = overlap.end_time.slice(0, 5);
    const activity = overlap.activity_type.charAt(0).toUpperCase() + overlap.activity_type.slice(1);
    const err = new Error(
      `This court is already reserved on ${formData.reservation_date} from ${startTime} to ${endTime} (${activity}). Please choose another time.`
    );
    err.conflict = { start_time: startTime, end_time: endTime, activity_type: overlap.activity_type };
    throw err;
  }

  const { data, error } = await supabase
    .from('reservations')
    .insert({
      user_id: user.id,
      activity_type: formData.activity_type,
      reservation_date: formData.reservation_date,
      start_time: formData.start_time,
      end_time: formData.end_time,
      notes: formData.notes || null,
      status: 'confirmed',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ─── CANCEL / DELETE RESERVATION (user) ───────────────────────────────
export const cancelReservation = async (reservationId) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', reservationId)
    .eq('user_id', user.id);

  if (error) throw error;
};

// ─── ADMIN: FETCH ALL RESERVATIONS ────────────────────────────────────
export const adminFetchReservations = async ({ status, activity_type, date } = {}) => {
  let query = supabase
    .from('reservations')
    .select('*')
    .order('reservation_date', { ascending: false })
    .order('start_time', { ascending: true });

  if (status) query = query.eq('status', status);
  if (activity_type) query = query.eq('activity_type', activity_type);
  if (date) query = query.eq('reservation_date', date);

  const { data: reservations, error } = await query;
  if (error) throw error;

  if (!reservations || reservations.length === 0) {
    return [];
  }

  // Fetch profiles for the unique user IDs
  const userIds = [...new Set(reservations.map(r => r.user_id).filter(Boolean))];
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name, role')
    .in('id', userIds);

  const profileMap = (profiles || []).reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {});

  return reservations.map(res => {
    const prof = profileMap[res.user_id];
    const name = prof?.name || 'Barangay Player';
    return {
      ...res,
      user: {
        name: name,
        email: `${name.toLowerCase().replace(/\s+/g, '')}@community.ph`,
        role: prof?.role || 'user',
      },
    };
  });
};

// ─── ADMIN: FETCH STATS ────────────────────────────────────────────────
export const adminFetchStats = async () => {
  const today = new Date().toISOString().split('T')[0];

  const [totalRes, todayRes, confirmedRes, cancelledRes, totalUsers] = await Promise.all([
    supabase.from('reservations').select('id', { count: 'exact', head: true }),
    supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('reservation_date', today),
    supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('status', 'confirmed'),
    supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('status', 'cancelled'),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
  ]);

  // Activity breakdown
  const { data: activityData } = await supabase
    .from('reservations')
    .select('activity_type')
    .neq('status', 'cancelled');

  const activityBreakdown = (activityData || []).reduce((acc, r) => {
    acc[r.activity_type] = (acc[r.activity_type] || 0) + 1;
    return acc;
  }, {});

  return {
    total_reservations: totalRes.count || 0,
    today_reservations: todayRes.count || 0,
    confirmed_reservations: confirmedRes.count || 0,
    cancelled_reservations: cancelledRes.count || 0,
    total_users: totalUsers.count || 0,
    activity_breakdown: activityBreakdown,
  };
};

// ─── ADMIN: UPDATE STATUS ──────────────────────────────────────────────
export const adminUpdateStatus = async (reservationId, status) => {
  const { data, error } = await supabase
    .from('reservations')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', reservationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ─── ADMIN: DELETE RESERVATION ─────────────────────────────────────────
export const adminDeleteReservation = async (reservationId) => {
  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', reservationId);

  if (error) throw error;
};
