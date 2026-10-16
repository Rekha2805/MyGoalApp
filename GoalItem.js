
import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

import AppText from './Appext';

const PINK = '#FF95A5';
const CREAM = '#FFF6DC';
const DARK = '#121212';
const DARK_CARD = '#242424';
const WHITE = '#FFFFFF';

export default function GoalItem({ text, onDelete, isDark }) {
  return (
    <View
      style={[
        styles.goalCard,
        {
          backgroundColor: isDark ? DARK_CARD : CREAM,
          borderColor: PINK,
        },
      ]}
    >
      {/* Goal text */}
      <View style={styles.textContainer}>
        <AppText
          style={[
            styles.goalText,
            {
              color: isDark ? WHITE : DARK,
            },
          ]}
        >
          {text}
        </AppText>
      </View>

      {/* Dustbin button */}
      <Pressable
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel={`Delete goal: ${text}`}
        style={({ pressed }) => [
          styles.deleteButton,
          {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
      >
        <AppText style={styles.deleteText}>
          🗑️
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 7,
    borderRadius: 14,
    borderWidth: 1.5,
    elevation: 3,
  },

  textContainer: {
    flex: 1,
    marginRight: 12,
  },

  goalText: {
    fontSize: 16,
    fontWeight: '600',
  },

  deleteButton: {
    backgroundColor: PINK,
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteText: {
    fontSize: 21,
    color: DARK,
  },
});
