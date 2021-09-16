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

  const emailLink = `mailto:${contacts.email}`;
  const phone = `tel:${contacts.phone}`;
  const whatsappLink = `https://wa.me/${contacts.whatsapp?.replace('+', '')}`;
  const instagram = `http://instagram.com/_u/${contacts.instagram}/`;
  const telegramLink = `tg://resolve?domain=${contacts.telegram}`;

  return (
    <Layout withFooter={false}>
      <div className={styles.ContactsWrapper}>
        <div className={styles.Contacts}>
          <p className={styles.Title}>Kushebina Aigerim</p>
          {contacts.email && (
            <a href={emailLink} className={styles.Cell} target="blank">
              {contacts.email}
              <img alt="phone" src="email.svg" className={styles.ContactsIcon} />
            </a>
          )}
          {contacts.phone && (
            <a href={phone} className={styles.Cell} target="blank">
              {contacts.phone}
              <img alt="phone" src="phone.svg" className={styles.ContactsIcon} />
            </a>
          )}
          {contacts.whatsapp && (
            <a href={whatsappLink} className={styles.Cell} target="blank">
              {contacts.whatsapp}
              <img alt="phone" src="whatsapp.svg" className={styles.ContactsIcon} />
            </a>
          )}
          {contacts.telegram && (
            <a href={telegramLink} className={styles.Cell} target="blank">
              {contacts.telegram}
              <img alt="phone" src="telegram.svg" className={styles.ContactsIcon} />
            </a>
          )}
          {contacts.instagram && (
            <a href={instagram} className={styles.Cell} target="blank">
              {contacts.instagram}
              <img alt="phone" src="instagram.svg" className={styles.ContactsIcon} />
            </a>
          )}
        </div>
        <img alt="background" className={styles.BackgroundImg} src={'/contactsBack.jpg'} />
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
