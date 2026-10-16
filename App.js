
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Switch,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import GoalInput from './GoalInput';
import GoalItem from './GoalItem';
import AppText from './Appext';

const PINK = '#FF95A5';
const CREAM = '#FFF6DC';
const DARK = '#121212';
const DARK_CARD = '#242424';
const WHITE = '#FFFFFF';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [enteredText, setEnteredText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Load saved goals and theme.
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedGoals = await AsyncStorage.getItem('goals');
        const savedTheme = await AsyncStorage.getItem('isDark');

        if (savedGoals !== null) {
          const parsedGoals = JSON.parse(savedGoals);

          if (Array.isArray(parsedGoals)) {
            setGoals(parsedGoals);
          }
        }

        if (savedTheme !== null) {
          setIsDark(JSON.parse(savedTheme) === true);
        }
      } catch (error) {
        console.log('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Save goals to storage.
  const saveGoals = async (updatedGoals) => {
    try {
      await AsyncStorage.setItem(
        'goals',
        JSON.stringify(updatedGoals)
      );
    } catch (error) {
      console.log('Error saving goals:', error);
    }
  };

  // Handle input changes.
  const goalInputHandler = (text) => {
    setEnteredText(text);
  };

  // Add a goal.
  const addGoalHandler = (goalText) => {
    const text = (
      typeof goalText === 'string' ? goalText : enteredText
    ).trim();

    if (!text) {
      return;
    }

    const newGoal = {
      id: `${Date.now()}-${Math.random()}`,
      text: text,
    };

    const updatedGoals = [...goals, newGoal];

    setGoals(updatedGoals);
    saveGoals(updatedGoals);

    setEnteredText('');
    setModalVisible(false);
  };

  // Delete a goal.
  const deleteGoalHandler = (goalId) => {
    const updatedGoals = goals.filter(
      (goal) => goal.id !== goalId
    );

    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  // Switch between Light Mode and Dark Mode.
  const toggleTheme = async (value) => {
    setIsDark(value);

    try {
      await AsyncStorage.setItem(
        'isDark',
        JSON.stringify(value)
      );
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const openGoalInput = () => {
    setEnteredText('');
    setModalVisible(true);
  };

  const cancelGoalInput = () => {
    setEnteredText('');
    setModalVisible(false);
  };

  return (
    <LinearGradient
      colors={
        isDark
          ? [DARK, DARK_CARD]
          : [CREAM, PINK]
      }
      style={styles.container}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.header}>
        <AppText
          style={[
            styles.title,
            { color: isDark ? WHITE : PINK },
          ]}
        >
          My Goals
        </AppText>

        <View style={styles.themeContainer}>

        <AppText
          style={{
            color: isDark ? WHITE : DARK,
            marginRight: 8,
            fontWeight: '600',
          }}
        >
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </AppText>


          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{
              false: PINK,
              true: '#555555',
            }}
            thumbColor={isDark ? PINK : CREAM}
          />
        </View>
      </View>

      <Pressable
        onPress={openGoalInput}
        style={({ pressed }) => [
          styles.addButton,
          { opacity: pressed ? 0.75 : 1 },
        ]}
      >
        <AppText style={styles.addButtonText}>
          + Add New Goal
        </AppText>
      </Pressable>

      <GoalInput
        visible={modalVisible}
        enteredText={enteredText}
        onInputChange={goalInputHandler}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalInput}
        isDark={isDark}
      />

      {goals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AppText
            style={[
              styles.emptyText,
              { color: isDark ? WHITE : DARK },
            ]}
          >
            No goals yet. Add your first goal!
          </AppText>
        </View>
      ) : (
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GoalItem
              text={item.text}
              onDelete={() => deleteGoalHandler(item.id)}
              isDark={isDark}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  addButton: {
    backgroundColor: PINK,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },

  addButtonText: {
    color: DARK,
    fontSize: 17,
    fontWeight: 'bold',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 17,
    textAlign: 'center',
  },

  list: {
    paddingBottom: 25,
  },
});
