import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useForm } from '@formspree/react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

import type { FormAnnualInvestorProps, FormAnnualInvestorOwnerState } from './FormAnnualInvestor.types';

const FormAnnualInvestor = (props: FormAnnualInvestorProps) => {
  const ownerState = { ...props, hasSuccessMessage: false };

  const sessionData = [
    {
      day: 'Monday, April 1',
      sessions: [
        {
          id: 'session1',
          description: 'Welcome Reception',
          startTime: '5:30 PM',
          endTime: '7:30 PM',
          location: 'CORSAIR PATIO & LAWN'
        }
      ]
    },
    {
      day: 'Tuesday, April 2',
      sessions: [
        {
          id: 'session2',
          description: 'Core Property Fund Advisory Committee Meeting* (breakfast served)',
          startTime: '8:00 AM',
          endTime: '9:00 AM',
          location: 'SABAL 1'
        },
        {
          id: 'session3',
          description: 'AM Breakfast (open to all attendees)',
          startTime: '8:30 AM',
          endTime: '10:00 AM',
          location: 'GARDEN FOYER'
        },
        {
          id: 'session4',
          description: 'TA Realty Logistics Fund Advisory Committee Meeting* (breakfast served)',
          startTime: '9:15 AM',
          endTime: '10:15 AM',
          location: 'SABAL 2'
        },
        {
          id: 'session5',
          description: 'The Realty Associates Fund XII Advisory Committee Meeting*',
          startTime: '10:30 AM',
          endTime: '11:00 AM',
          location: 'SABAL 1'
        },
        {
          id: 'session6',
          description: 'The Realty Associates Fund XIII Advisory Committee Meeting*',
          startTime: '11:15 AM',
          endTime: '11:45 AM',
          location: 'SABAL 2'
        },
        {
          id: 'session7',
          description: 'TA Realty Firm Updates (lunch served)',
          startTime: '12:00 PM',
          endTime: '12:45 PM',
          location: 'Lunch Area'
        },
        {
          id: 'session8',
          description: 'PM BREAK',
          startTime: '12:45 PM',
          endTime: '1:00 PM'
        },
        {
          id: 'session9',
          description: 'Research Panel',
          startTime: '1:00 PM',
          endTime: '2:00 PM'
        },
        {
          id: 'session10',
          description: 'PM BREAK',
          startTime: '2:00 PM',
          endTime: '2:15 PM'
        },
        {
          id: 'session11',
          description: 'TA Realty Logistics Fund Meeting',
          startTime: '2:15 PM',
          endTime: '3:15 PM'
        },
        {
          id: 'session12',
          description: 'PM BREAK',
          startTime: '3:15 PM',
          endTime: '3:30 PM'
        },
        {
          id: 'session13',
          description: 'Property Tour of Pearl Flagler Village, a CPF Multifamily Asset+',
          startTime: '3:30 PM',
          endTime: '5:30 PM',
          location: '400 NE 3rd AVENUE, FORT LAUDERDALE'
        },
        {
          id: 'session14',
          description: 'Dinner',
          startTime: '7:30 PM',
          endTime: '8:30 PM',
          location: 'CASCADA POOL'
        }
      ]
    },
    {
      day: 'Wednesday, April 3',
      sessions: [
        {
          id: 'session15',
          description: 'Breakfast',
          startTime: '8:00 AM',
          endTime: '9:00 AM',
          location: 'GARDEN FOYER'
        },
        {
          id: 'session16',
          description: 'TA Realty Core Property Fund Meeting',
          startTime: '9:00 AM',
          endTime: '10:00 AM'
        },
        {
          id: 'session17',
          description: 'BREAK',
          startTime: '10:00 AM',
          endTime: '10:15 AM'
        },
        {
          id: 'session18',
          description: 'TA Realty Value-Add Fund XIII Meeting',
          startTime: '10:15 AM',
          endTime: '11:00 AM'
        },
        {
          id: 'session19',
          description: 'BREAK',
          startTime: '11:00 AM',
          endTime: '11:15 AM'
        },
        {
          id: 'session20',
          description: 'The Realty Associates Fund XII Meeting',
          startTime: '11:15 AM',
          endTime: '12:00 PM'
        },
        {
          id: 'session21',
          description: 'BREAK',
          startTime: '12:00 PM',
          endTime: '12:15 PM'
        },
        {
          id: 'session22',
          description: 'Additional Meetings (if needed)',
          startTime: '12:15 PM',
          endTime: '1:00 PM'
        },
        {
          id: 'session23',
          description: 'Lunch',
          startTime: '1:00 PM',
          endTime: '2:00 PM'
        }
      ]
    }
  ];

  const { formspreeId } = props;

  const [selectedSessions, setSelectedSessions] = useState<{ [key: string]: boolean }>({});
  const [receiveCalendarInvite, setReceiveCalendarInvite] = useState(false);
  const [state, handleSubmit] = useForm(formspreeId || '');

  const handleSessionChange = (sessionId: string) => {
    setSelectedSessions((prevSelectedSessions) => ({
      ...prevSelectedSessions,
      [sessionId]: !prevSelectedSessions[sessionId]
    }));
  };

  const handleCalendarInviteChange = () => {
    setReceiveCalendarInvite(!receiveCalendarInvite);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit the form using the handleSubmit function
    await handleSubmit(e);
    // Handle session sign-up and calendar invite here
    const selectedSessionIds = Object.keys(selectedSessions).filter((sessionId) => selectedSessions[sessionId]);
    const calendarInviteData = {
      selectedSessions,
      receiveCalendarInvite
    };
    // Handle your data submission logic here.
  };

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h6">Session Sign-Up</Typography>
      <Timeline>
        {sessionData.map((day) => (
          <React.Fragment key={day.day}>
            <Typography variant="h3">{day.day}</Typography>
            {day.sessions.map((session) => (
              <TimelineItem key={session.id}>
                <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                  {session.startTime} - {session.endTime}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSessions[session.id] || false}
                        onChange={() => handleSessionChange(session.id)}
                      />
                    }
                    label={` ${session.description} ${session.location ? `(${session.location})` : ''}`}
                  />
                </TimelineContent>
              </TimelineItem>
            ))}
          </React.Fragment>
        ))}
      </Timeline>

      <FormControlLabel
        control={<Checkbox checked={receiveCalendarInvite} onChange={handleCalendarInviteChange} />}
        label="Receive Calendar Invite for Selected Sessions"
      />

      <Button type="submit" variant="contained" color="primary">
        RSVP
      </Button>
    </form>
  );
};

export default FormAnnualInvestor;
