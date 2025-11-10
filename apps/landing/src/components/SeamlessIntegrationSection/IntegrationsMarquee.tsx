import Marquee from 'react-fast-marquee';
import {
  ChatgptIcon,
  FacebookIcon,
  GoHighLevelIcon,
  GoogleIcon,
  HubspotIcon,
  InstagramIcon,
  LinkedinIcon,
  SalesforceIcon,
  SlackIcon,
  TrelloIcon,
  XIcon,
  ZapierIcon,
} from '@innovo/icons';

export const IntegrationsMarquee = () => {
  return (
    <div className={'relative'}>
      <Marquee>
        <LinkedinIcon height={200} />
        <FacebookIcon height={200} />
        <ChatgptIcon height={200} />
        <InstagramIcon height={200} />
        <GoogleIcon height={200} />
        <HubspotIcon height={200} />
        <SalesforceIcon height={200} />
        <SlackIcon height={200} />
        <TrelloIcon height={200} />
        <XIcon height={200} />
        <ZapierIcon height={200} />
        <GoHighLevelIcon height={200} />
      </Marquee>
    </div>
  );
};
