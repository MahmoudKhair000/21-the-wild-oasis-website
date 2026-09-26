'use server';
// use server directive is required to use server actions, not for server components.
import supabase from './supabase';
import { auth, signIn, signOut } from './auth';
import { revalidatePath } from 'next/cache';

export async function updateGuest(formData) {
  // 1. Check if there is an authenticated user session
  const session = await auth();
  if (!session) throw new Error('You must be logged in');
  console.log(session);

  // console.log(formData);
  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  // 2. Check if the ID is valid
  // this is not the ideal way to validate national IDs
  // , there are more professional ways to do it
  if (!/^[a-zA-Z0-9]{6,14}$/.test(nationalID))
    throw new Error('Please provide a valid national ID');

  // 3. if there are no obstacles
  // , create the update object
  const updateData = { nationality, countryFlag, nationalID };
  console.log(updateData);

  // , and update the guest in supabase tables
  const { error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', String(session.user.guestId));
  // .eq('email', String(session.user.email));
  if (error) throw new Error('Guest could not be updated');

  // 4. Revalidate Cache manually for the UI
  revalidatePath('/account/profile');
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}
export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
