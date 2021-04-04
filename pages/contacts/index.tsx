import { GetStaticProps } from 'next';

import { Layout } from 'components';
import { Contacts } from 'models/contacts';
import { api } from 'services/api';
import { Error } from 'components/Error/Error';

import styles from './Contacts.module.scss';

type ContactsProps = {
  contacts?: Contacts;
  error?: string;
};

export default function ContactsPage({ contacts, error }: ContactsProps) {
  if (error) {
    return <Error title={error} />;
  }

  return (
    <Layout withFooter>
      <div className={styles.Contacts}>
        <p className={styles.Title}>Кушебина Айгерим</p>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ContactsProps> = async () => {
  try {
    const contacts = await api.contacts.getContacts();

    return {
      props: {
        contacts,
      },
    };
  } catch (err) {
    return {
      props: {
        error: err.message,
      },
    };
  }
};
