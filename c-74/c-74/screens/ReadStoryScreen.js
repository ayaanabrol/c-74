import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class ReadScreen extends React.Component {
  state = {
    search: '',
    allStories: [''],
    dataSource: [],
  };

  updateSearch = (search) => {
    this.setState({ search: search });
  };

  componentDidMount() {
    this.retrieveStories();
  }

  retrieveStories = () => {
    try {
      var allStories = [];
      var stories = db
        .collection('Story')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {

            allStories.push(doc.data());
            console.log('these are the stories', allStories);
          });
          this.setState({ allStories: allStories });
        });
    } catch (error) {
      console.log(error);
    }
  };



  SearchFilterFunction(text) {
    const newData = this.state.allStories.filter((item) => {
      const itemData = item.Title ? item.Title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: 'white' }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'pink',
              textAlign: 'center',
              color: 'white',
            }}>
            Bed Time Stories
          </Text>

          <SearchBar
            placeholder="Type Here..."
            onChangeText={(text) => this.SearchFilterFunction(text)}
            onClear={(text) => this.SearchFilterFunction('')}
            value={this.state.search}
          />

          <FlatList
            data={
              this.state.search === ''
                ? this.state.allStories
                : this.state.dataSource
            }
            renderItem={({ item }) => (
              <View style={{ borderBottomWidth: 2 }}>
                <View style={styles.itemContainer}>
                  <Text>Title: {item.Title}</Text>
                  <Text>Author : {item.Author}</Text>
                  <Text>Story: {item.Story}</Text>
                </View>

                keyExtractor={(item,index) => index.toString()}
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: 'pink',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  itemContainer: {
    height: 80,
    width: '100%',
    borderWidth: 2,
    borderColor: 'pink',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
