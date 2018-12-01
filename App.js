import React from 'react';
import { FlatList } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';


// Import getNews function from news.js
import { getNews } from './src/components/new.js';
// We'll get to this one later
import Article from './src/components/Article.js';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.fetchNews = this.fetchNews.bind(this);
  }
  // Called after a component is mounted
  componentDidMount() {
    this.fetchNews();
   }

  fetchNews() {
    getNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
    },
      () => this.fetchNews()
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
  );
  }
}

class PoliticScreen extends React.Component {
  render() {
    return (
      <Text> Hello Yale!</Text>
  );
  }
}

class TechScreen extends React.Component {
  render() {
    return (
      <Text> Hello Yale!</Text>
  );
  }
}
class SportScreen extends React.Component {
  render() {
    return (
      <Text> Hello Yale!</Text>
  );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Politics: PoliticScreen,
  Tech: TechScreen,
  Sports: SportScreen,
});

export default createAppContainer(TabNavigator);

