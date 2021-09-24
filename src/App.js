import logo from './logo.svg';
import './App.css';
import { useState } from 'react/cjs/react.development';
import { useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>React Core Concepts Practice</h1>
      </header>
      <main>
        <Mobile></Mobile>
        <Tasks></Tasks>
        <section id="blog">
          <h2 className="section-title">Blog Section</h2>
          <Blog heading="Heading-1" author="Fazle"></Blog>
          <Blog heading="Heading-2" author="Rabbi"></Blog>
          <Blog heading="Heading-3" author="Rana"></Blog>
        </section>
        <Article></Article>
      </main>
    </div>
  );
}

/**
* Todo component
*/
function Tasks() {
  const [allTasks, setAllTasks] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_start=3&_limit=10')
      .then(res => res.json())
      .then(data => setAllTasks(data));
  }, []);

  return (
    <section id="todo">
      <h2 className="section-title">Todos from API</h2>
      <div id="all_tasks" className="all-tasks">
        {
          allTasks.map((task, index) => <SingleTask serial={index + 1} title={task.title} status={task.completed === true ? 'Yes' : 'No'}></SingleTask>)
        }
      </div>
    </section>
  );
}

function SingleTask(props) {
  const {serial, title, status} = props;
  const taskTitle = title.length > 27 ? (title.slice(0, 27) + '...') : title;
  const statusClass = status.toLowerCase() !== 'yes' ? 'incomplete' : 'complete';

  return (
    <div className="task">
      <h4 className="task-serial">{serial}</h4>
      <h3 className="task-title">{taskTitle}</h3>
      <p className="task-status">Is completed: <strong className={statusClass}>{status}</strong></p>
    </div>
  );
}

/**
* Mobile battery component
*/
function Mobile() {
  const [remainingHealth, setRemainingHealth] = useState(100);
  const batteryDown = () => {
    const newRemainingHealth = (remainingHealth <= 0) ? 0 : (remainingHealth - 10);
    setRemainingHealth(newRemainingHealth);
    updateBatteryState(newRemainingHealth);
  };
  const batteryRecharge = () => {
    const newRemainingHealth = (remainingHealth >= 100) ? 100 : (remainingHealth + 10);
    setRemainingHealth(newRemainingHealth);
    updateBatteryState(newRemainingHealth);
  }
  const updateBatteryState = (health) => {
    const batteryFill = document.getElementById('battery_fill');
    batteryFill.style.width = health + '%';
    if(health <= 30) {
      batteryFill.style.background = 'crimson';
    } else if(health <= 60) {
      batteryFill.style.background = 'gold';
    } else {
      batteryFill.style.background = 'lime';
    }
  }

  return (
    <section id="mobile" className="mobile">
      <div className="battery">
        <div className="battery-state">
          <div id="battery_fill"></div>
          <h6 id="battery_percentage">{remainingHealth}%</h6>
        </div>
      </div>
      <div>
        <button onClick={batteryDown} title="Click to decrease">Battery down</button>
        <button onClick={batteryRecharge} style={{borderColor: 'green'}} title="Click to increase">Recharge</button>
      </div>
    </section>
  );
}

/**
* Blog component
*/
function Blog(props) {
  return (
    <div className="blog">
      <h3 style={{fontSize: '22px', fontWeight: '500'}}>Blog {props.heading}</h3>
      <p style={{marginTop: '10px'}}>Author: {props.author}</p>
    </div>
  );
}

/**
* Article component
*/
function Article() {
  const titleStyle = {
    display: 'inline-block',
    padding: '5px 30px',
    margin: '0 0 10px',
    backgroundColor: 'cadetblue',
    color: 'white',
    fontSize: '22px',
  }
  
  return (
    <section id="article">
      <h2 className="section-title">Article Section</h2>
      <article className="blog">
        <h3 style={titleStyle}>Article Title</h3>
        <p style={{color:'aliceblue'}}>This is dummy texts for the article. Because I'm not good at that.</p>
      </article>
    </section>
  );
}

export default App;
