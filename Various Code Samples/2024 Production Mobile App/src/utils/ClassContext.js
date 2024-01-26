import React from 'react';
import { settingsData } from '../testFiles/settingsData';

// this is the equivalent to the createStore method of Redux
const ClassContext = React.createContext(settingsData);

// creating Provider and Consumer and exporting them
export const ClassProvider = ClassContext.Provider;
export const ClassConsumer = ClassContext.Consumer;

export default ClassContext;
