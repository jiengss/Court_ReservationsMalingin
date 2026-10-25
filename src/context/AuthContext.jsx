import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /**
     * Fetch the profile row (name, role) from the `profiles` table
     * and merge it into the Supabase auth user object.
     */
    const loadProfile = async (authUser) => {
        if (!authUser) {
            setUser(null);
            return null;
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('name, role')
            .eq('id', authUser.id)
            .single();

        const enriched = {
            ...authUser,
            name: profile?.name || authUser.email.split('@')[0],
            role: profile?.role || 'user',
        };
        setUser(enriched);
        return enriched;
    };

    // On mount — restore session and subscribe to auth changes
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            loadProfile(session?.user ?? null).finally(() => setLoading(false));
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            loadProfile(session?.user ?? null).finally(() => setLoading(false));
        });

        return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await loadProfile(data.user);
        return data;
    };

    const register = async (name, email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
        });
        if (error) throw error;
        // Profile is auto-created by the DB trigger on_auth_user_created
        await loadProfile(data.user);
        return data;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const isAdmin = Boolean(user && user.role === 'admin');

    // Provide a fake `token` value for backward compat with ProtectedRoute checks
    const token = user ? 'supabase-session' : null;

    return (
        <AuthContext.Provider value={{ user, token, loading, isAdmin, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);