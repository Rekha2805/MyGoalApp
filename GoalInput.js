
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AppText from './Appext';

const PINK = '#FF95A5';
const CREAM = '#FFF6DC';
const DARK = '#121212';
const DARK_CARD = '#242424';
const WHITE = '#FFFFFF';

export default function GoalInput({
  onAddGoal,
  onInputChange,
  enteredText,
  visible,
  onCancel,
  isDark,
}) {
  const handleAdd = () => {
    if (typeof onAddGoal === 'function') {
      onAddGoal(enteredText);
    }
  };

  const handleCancel = () => {
    Keyboard.dismiss();

    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={handleCancel}
    >
      <SafeAreaView
        style={[
          styles.safeArea,
          { backgroundColor: isDark ? DARK : CREAM },
        ]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.flex}>
            <LinearGradient
              colors={
                isDark
                  ? [DARK, DARK_CARD]
                  : [CREAM, PINK]
              }
              style={styles.modalContainer}
            >
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: isDark ? DARK_CARD : CREAM,
                    borderColor: PINK,
                  },
                ]}
              >
                <AppText
                  style={[
                    styles.title,
                    { color: isDark ? WHITE : PINK },
                  ]}
                >
                  Add New Goal
                </AppText>

                <TextInput
                  value={enteredText}
                  onChangeText={onInputChange}
                  placeholder="Enter your goal"
                  placeholderTextColor={
                    isDark ? '#BBBBBB' : '#A65A69'
                  }
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDark ? DARK : WHITE,
                      color: isDark ? WHITE : DARK,
                      borderColor: PINK,
                    },
                  ]}
                  returnKeyType="done"
                  onSubmitEditing={handleAdd}
                />

                <View style={styles.buttonsContainer}>
                  <Pressable
                    onPress={handleAdd}
                    style={({ pressed }) => [
                      styles.button,
                      styles.addButton,
                      { opacity: pressed ? 0.7 : 1 },
                    ]}
                  >
                    <AppText style={styles.addButtonText}>
                      Add
                    </AppText>
                  </Pressable>

                  <Pressable
                    onPress={handleCancel}
                    style={({ pressed }) => [
                      styles.button,
                      styles.cancelButton,
                      {
                        backgroundColor: isDark ? DARK : CREAM,
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                  >
                    <AppText
                      style={[
                        styles.cancelButtonText,
                        { color: isDark ? WHITE : PINK },
                      ]}
                    >
                      Cancel
                    </AppText>
                  </Pressable>
                </View>
              </View>
            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  modalContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    justifyContent: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    marginBottom: 24,
  },

  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButton: {
    backgroundColor: PINK,
  },

  addButtonText: {
    color: DARK,
    fontSize: 18,
    fontWeight: 'bold',
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: PINK,
  },

  cancelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
