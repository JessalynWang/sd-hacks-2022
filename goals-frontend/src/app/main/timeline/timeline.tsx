import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './timeline.css';
import TimelineLine from './timeline-line/timeline-line';
import { useParams } from 'react-router';
import { Goal } from '../../+types/goal';
import GoalCard from '../../shared/goal-card/goal-card';

function Timeline() {
  const [currGoal, setCurrGoal] = useState<any>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  
  const userId = localStorage.getItem('currentUserId');

  const goalData = [
    {
      '_id': 'foo',
      'title': 'SD Hacks',
      'description': 'Submit a cool project for sd hacks 2022! We want to make Goals, an app for users to create, manage and follow goals. The stack is React, Flask, and MongoDB',
      'creator': 'Udo',
      'start_date': new Date(2022, 11, 17),
      'end_date': new Date(2022, 11, 17),

      'subgoals': [
        {'_id': 'bar',
        '_creatorId': null,
       'title': 'Finish Homework',
       'description': 'Needa do that homework',
       'start_date': new Date(2022, 11, 18),
       'end_date': new Date(2022, 11, 18),
 
       'subgoals': [],
       '_parentId': "",
       'depth': 0,
       'tags': [],
 
       'followers': [],
       'follower_count': 4,
 
       'inspired_goals': [],
       'inspired_by': null,
       },
       {
           '_id': 'foo2',
           'title': 'Not Subgoal 2',
           'description': 'This is the second subgoal for sd hacks 2022',
           '_creatorId': 'Udo',
           'start_date': new Date(2022, 10, 4),
           'end_date': new Date(2022, 10, 4),
     
           'subgoals': [],
           '_parentId': "",
           'depth': 0,
           'tags': [],
     
           'followers': [],
           'follower_count': 0,
     
           'inspired_goals': [],
           'inspired_by': null,
         }
      ],
      '_parentId': "",
      'depth': 0,
      'tags': ['education', 'hackathon', 'computer science', 'learning'],

      'followers': [],
      'follower_count': 0,

      'inspired_goals': [],
      'inspired_by': {
        'title':'sd hacks'
      },
    },

    {
      '_id': 'bar',
      'title': 'Finish Homework',
      'description': 'Needa do that homework',
      'creator': 'Udo',
      'start_date': new Date(2022, 11, 18),
      'end_date': new Date(2022, 11, 18),

      'subgoals': [],
      '_parentId': "",
      'depth': 0,
      'tags': [],

      'followers': [],
      'follower_count': 4,

      'inspired_goals': [],
      'inspired_by': null,
    },

    {
      '_id': 'foo2',
      'title': 'Subgoal 2',
      'description': 'This is the second subgoal for sd hacks 2022',
      'creator': 'Udo',
      'start_date': new Date(2021, 10, 4),
      'end_date': new Date(2021, 10, 4),

      'subgoals': [],
      '_parentId': "foo",
      'depth': 1,
      'tags': [],

      'followers': [],
      'follower_count': 0,

      'inspired_goals': [],
      'inspired_by': null,
    },

    {
      '_id': 'buz',
      'title': 'Old Goal',
      'description': 'This is goal has passed',
      'creator': 'Udo',
      'start_date': new Date(2021, 10, 3),
      'end_date': new Date(2021, 10, 3),

      'subgoals': [],
      '_parentId': "",
      'depth': 0,
      'tags': [],

      'followers': [],
      'follower_count': 0,

      'inspired_goals': [],
      'inspired_by': null,
    },

    {
      '_id': 'foo1',
      'title': 'Subgoal 1',
      'description': 'This is the first subgoal for the sd hacks goal',
      'creator': 'Udo',
      'start_date': new Date(2022, 10, 2),
      'end_date': new Date(2022, 10, 2),

      'subgoals': [],
      '_parentId': "foo",
      'depth': 1,
      'tags': [],

      'followers': [],
      'follower_count': 0,

      'inspired_goals': [],
      'inspired_by': null,
    },
  ]

  useEffect(() => {
    axios.get('/api/goals/timeline/' + userId)
      .then((result: any) => {
        console.log("result", result)
        setGoals(result['data'])
      })
      .catch((_: any) => {
        console.log("ERROR")
      })
  }, [])


  return (
    <div className='timeline'>
      <div className="header">Timeline</div>

      {
        goals.length === 0 ?

        <div>You have no goals yet, head to create goals to make one or to explore goals to find and follow!</div>

        :
        <div className="content">
        <TimelineLine
          goalData={goals}
          setGoal={setCurrGoal}
        ></TimelineLine>
        {
          currGoal === null ? 
          <GoalCard goal={currGoal}></GoalCard>
          : <GoalCard goal={currGoal}></GoalCard>
        }
        </div>
      }
    </div>
  )
}

export default Timeline;