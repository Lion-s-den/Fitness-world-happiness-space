// Authentication Logic for Fitness World Happiness Space

/**
 * Sign up a new user
 * @param {string} email 
 * @param {string} password 
 * @param {string} fullName 
 */
async function signUp(email, password, fullName) {
  try {
    // 1. Create auth user
    const { data, error } = await window.supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) throw error;

    // 2. Create profile in profiles table (if user was created)
    if (data.user) {
      const { error: profileError } = await window.supabaseClient
        .from('profiles')
        .upsert({
          id: data.user.id,
          full_name: fullName,
          email: email,
          membership_status: 'free',
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.warn('Profile creation warning:', profileError.message);
        // Continue even if profile fails - we can create it later
      }
    }

    return { success: true, data };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Sign in existing user
 * @param {string} email 
 * @param {string} password 
 */
async function signIn(email, password) {
  try {
    const { data, error } = await window.supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Sign out current user
 */
async function signOut() {
  try {
    const { error } = await window.supabaseClient.auth.signOut();
    if (error) throw error;
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Sign out error:', error);
    alert('Error signing out: ' + error.message);
  }
}

/**
 * Get current session
 */
async function getSession() {
  try {
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

/**
 * Get current user profile from profiles table
 */
async function getUserProfile() {
  try {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    if (!user) return null;

    const { data, error } = await window.supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      // If profile doesn't exist yet, return basic info
      return {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || 'Member',
        membership_status: 'free'
      };
    }

    return data;
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
}

/**
 * Update user profile
 */
async function updateProfile(updates) {
  try {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await window.supabaseClient
      .from('profiles')
      .upsert({
        id: user.id,
        ...updates,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: error.message };
  }
}

// Make functions globally available
window.auth = {
  signUp,
  signIn,
  signOut,
  getSession,
  getUserProfile,
  updateProfile
};
