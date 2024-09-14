import { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { faCalendar, faClock, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { getSessionTime } from '../../helpers/DateHelper';
import { GraphQLSession } from 'src/types/session';

type SessionItemProps = {
  session: GraphQLSession;
};

const SessionItem = (props: SessionItemProps): JSX.Element => {
  const getImageStyles = (session: GraphQLSession): CSSProperties =>
    session?.image?.jsonValue?.value?.src
      ? {
          backgroundImage: `url(${session.image.jsonValue.value.src})`,
        }
      : {};

  const featuredIcon = props.session.premium?.value && (
    <div className="session-featured" title="Premium">
      <FontAwesomeIcon className="icon-yellow" icon={faStar} />
    </div>
  );

  const day =
    props.session.day?.targetItems &&
    props.session.day.targetItems.length > 0 &&
    props.session.day.targetItems.map((day, index) => (
      <p key={index}>
        {/* <span>
          <FontAwesomeIcon className="icon" icon={faCalendar} />
        </span> */}
        <Text tag="span" field={day.name} />
      </p>
    ));

  const timeSlot = props.session.timeslots?.targetItems &&
    props.session.timeslots.targetItems.length > 0 && (
      <p>
        {/* <span>
          <FontAwesomeIcon className="icon" icon={faClock} />
        </span> */}
        {getSessionTime(props.session.timeslots.targetItems)}
      </p>
    );

  const speaker =
    props.session.speakers?.targetItems &&
    props.session.speakers.targetItems.map((speaker, index) => (
      <p key={index}>
        {/* <span>
          <FontAwesomeIcon className="icon" icon={faUser} />
        </span> */}
        <Text tag="span" className="speaker-name" field={speaker.name} />
        {speaker.jobTitle?.value && (
          <span>
            {' | '}
            <Text tag="span" field={speaker.jobTitle} />
          </span>
        )}
      </p>
    ));

  return (
    <div className="bg-white shadow-lg rounded-lg p-2">
      <Link href={props.session.url.path} passHref className="grid-item">
        <div className="image-hover-zoom" style={getImageStyles(props.session)}></div>

        <div
          className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
       dark:bg-neutral-700 md:max-w-xl md:flex-row"
        >
          <img
            className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={props.session.image?.jsonValue.value?.src}
            alt=""
          />
          <div className="flex flex-col justify-start p-6">
            <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
              <Text className="item-title" field={props.session.name} />
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </p>
            {/* {featuredIcon} */}
            <div className="item-details item-details-left">
              <Text tag="div" className="item-title" field={props.session.name} />
              {day}
              {timeSlot}
              {speaker}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SessionItem;
