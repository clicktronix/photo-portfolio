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
  if (error || !contacts) {
    return <Error title={error} />;
  }

  const whatsappLink = `https://wa.me/${contacts.whatsapp?.replace('+', '')}`;
  const emailLink = `mailto:${contacts.email}`;
  const instagram = `http://instagram.com/_u/${contacts.instagram}/`;

  return (
    <Layout withFooter>
      <div className={styles.Contacts}>
        <p className={styles.Title}>Кушебина Айгерим</p>
        <a href={emailLink} className={styles.Cell} target="blank">
          {contacts.email}
        </a>
        <p className={styles.Cell}>{contacts.telegram}</p>
        <a href={instagram} className={styles.Cell} target="blank">
          {contacts.instagram}
        </a>
        <p className={styles.Cell}>{contacts.phone}</p>
        <a href={whatsappLink} className={styles.Cell} target="blank">
          {contacts.whatsapp}
        </a>
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
