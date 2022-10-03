import { redirect } from 'react-router-dom';
import { deleteContact } from '../services/utils/contacts';

export const action = async ({ params }) => {
  throw new Error('oh dang!');

  await deleteContact(params.contactId);

  return redirect('/');
};
