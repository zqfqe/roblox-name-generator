import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Home } from './Home';
import { NameStyle } from '../types';

export const LetterHub: React.FC = () => {
  const { char } = useParams<{ char: string }>();
  
  if (!char || char.length !== 1 || !/[a-zA-Z]/.test(char)) {
    return <Navigate to="/404" replace />;
  }

  const upperChar = char.toUpperCase();

  return (
    <Home 
      forcedStyle={NameStyle.MIXED}
      forcedPrefix={upperChar}
      initialKeyword={upperChar}
      topicTitle={`Roblox Names Starting with "${upperChar}"`}
    />
  );
};
