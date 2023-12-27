import { useState } from 'react';
import React from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';
import css from './Feedback.module.css';

function Feedback() {
  const [feedbackState, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const feedback = type => {
    setFeedback(prevState => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedbackState;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return countTotalFeedback() === 0
      ? 0
      : Math.round((good / countTotalFeedback()) * 100);
  };

  const { good, neutral, bad } = feedbackState;
  return (
    <div className={css.containerStatistics}>
      <h2 className={css.title}>Please leave feedback</h2>
      <FeedbackOptions
        options={Object.keys(feedbackState)}
        onLeaveFeedback={feedback}
      />

      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercent={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
}

export default Feedback;
