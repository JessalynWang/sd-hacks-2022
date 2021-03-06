import { useEffect, useState } from 'react';
import axios from 'axios';
import './explore.css';
import { Goal } from '../../+types/goal';
import { Tag } from '../../+types/tag';
import { Autocomplete, TextField } from '@mui/material';
import GoalCard from '../../shared/goal-card/goal-card';
import Alert from '@mui/material/Alert';

function Explore() {
    const userId = localStorage.getItem('currentUserId');

    const [goals, setGoals] = useState<Goal[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

    useEffect(() => {
      // get all goals where creator is not equal to current user
      // setGoals(goalData)
  
      // get all tags
      // setTags(tagData);

      axios.get('/api/goals/explore/' + userId)
      .then((result: any) => {
        console.log("result", result)
        setGoals(result['data'])
      })
      .catch((_: any) => {
        console.log("ERROR")
      })

      axios.get('/api/tags/')
      .then((result: any) => {
        console.log("result", result)
        setTags(result['data'])
      })
      .catch((_: any) => {
        console.log("ERROR getting tags")
      })
    }, [])
    
    // if the user is filtering by tags, filter goals by tag
    function filteredGoals() {
      if (filteredTags.length === 0) {
        return goals
      } else {
        return goals.filter((goal) => {
          let flag = false;
          goal.tags.forEach((tag: Tag) => {
            if (findTag(tag)) {
              flag = true;
            }
          })

          return flag;
        })

        // return []
      }
    }

    function findTag(t: Tag) {
      let flag = false;
      filteredTags.forEach((tag: Tag) => {
        if (tag.text === t.text) {
          flag = true;
        }
      })

      return flag
    }

    return (
      <div className="explore">
        <div className="explore-head">Explore Goals</div>
        <h3>If you see a goal you like, click on it to follow along!</h3>
        <div className="explore-auto">
          <Autocomplete
            multiple
            id="tags-outlined"
            options={tags}
            getOptionLabel={(option) => option.text}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="FilterGoals"
                placeholder="Labels"
              />
            )}
            onChange={(_event, newTags) => {
              setFilteredTags(newTags);
            }}
          />
        </div>
        <div className='cards'>
          {
            filteredGoals().map((goal: Goal, idx: number) => {
              return <div className="card-area" key={idx}><div className="card-area-card" onClick={() => followGoal(goal)}><GoalCard goal={goal}></GoalCard></div></div>
            })
          }
        </div>
      </div>
    )

    function followGoal(goal: Goal) {
      const newGoal = {...goal}

      const toAddFollower = [goal._id, ]
      newGoal._id = ''
      newGoal._creatorId = userId
      newGoal.inspired_by = goal

      newGoal.subgoals.forEach((subgoal, idx) => {
        toAddFollower.push(subgoal._id)
        newGoal.subgoals[idx]._id = ''
        newGoal.subgoals[idx].inspired_by = goal.subgoals[idx]
      })

      axios.post('/api/goals', newGoal)
      .then((_: any) => {
        console.log('Successfully created goal');
        // <Alert severity="success">Followed the goal! Check it out in your timeline</Alert>
      })
      .catch((_: any) => {
        console.log('error posting goal');
      })

      axios.post('/api/goals/updatef', {
        ids: toAddFollower
      })
      .then((_: any) => {
        console.log('Successfully udpated');
        // <Alert severity="success">You can now access this goal's forum!</Alert>
      })
      .catch((_: any) => {
        console.log('error udateing');
      })
    }


}

export default Explore