import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  Image,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Header } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class WriteStoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      storyText: '',
    };
  }

  submitStory = () => {
    db.collection('Story').add({
      Title: this.state.title,
      Author: this.state.author,
      Story: this.state.storyText,
    });
    this.setState({
      title: '',
      author: '',
      storyText: '',
    });
    ToastAndroid.show('Story Submitted', ToastAndroid.SHORT);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Header
          backgroundColor={'pink'}
          centerComponent={{
            text: 'Story Hub',
            style: { color: 'white', fontSize: 20, fontWeight: 'bold' },
          }}
        />

        <TextInput
          placeholder="Story Title"
          onChangeText={(text) => {
            this.setState({
              title: text,
            });
          }}
          value={this.state.title}
          style={styles.title}
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Author"
          onChangeText={(text) => {
            this.setState({
              author: text,
            });
          }}
          placeholderTextColor="black"
          value={this.state.author}
          style={styles.author}
        />
        <TextInput
          placeholder="Write your story"
          onChangeText={(text) => {
            this.setState({
              storyText: text,
            });
          }}
          placeholderTextColor="black"
          value={this.state.storyText}
          style={styles.storyText}
          multiline={true}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.submitStory}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    height: 40,
    borderWidth: 2,
    marginTop: 40,
    margin: 10,
    color:'black',
    padding:6,
  },
  author: {
    height: 40,
    borderWidth: 2,
    margin: 10,
    padding:6,
  },
  storyText: {
    height: 250,
    borderWidth: 2,
    margin: 10,
    padding:6,
  },
  submitButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'gray',
    width: 80,
    height: 40,
 color:'black,'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    color:'black',
  },
 
});
