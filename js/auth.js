// Authentication Logic for Fitness World Happiness Space

function getClient() {
  if (!window.supabaseClient) {
    throw new Error('Supabase is not loaded. Please refresh the page and try again.');
  }
  return window.supabaseClient;
}

/**
 * Sign up a new user
 */
async function signUp(email, password, fullName) {
  try {
    const client = getClient();

    // 1. Create auth user
    const { data, error } = await client.auth.signUp({
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
      const { error: profileError } = await client
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
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Sign in existing user
 */
async function signIn(email, password) {
  try {
    const client = getClient();

    const { data, error } = await client.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Sign out current user
 */
async function signOut() {
  try {
    const client = getClient();
    const { error } = await client.auth.signOut();
    if (error) throw error;
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Sign out error:', error);
    alert('Error signing out: ' + (error.message || error));
  }
}

/**
 * Get current session
 */
async function getSession() {
  try {
    const client = getClient();
    const { data: { session }, error } = await client.auth.getSession();
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
    const client = getClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return null;

    const { data, error } = await client
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
    const client = getClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await client
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
    return { success: false, error: error.message || String(error) };
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
