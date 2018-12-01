import React from 'react';
import { FlatList } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';


// Import getNews function from news.js
import { getNews } from './src/components/new.js';
import { getTechNews } from './src/components/tech.js';
import { getPoliticsNews } from './src/components/politics.js';
import { getSportNews } from './src/components/sports.js';
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
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.fetchPoliticNews = this.fetchPoliticNews.bind(this);
  }
  // Called after a component is mounted
  componentDidMount() {
    this.fetchPoliticNews();
   }

  fetchPoliticNews() {
    getPoliticsNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
    },
      () => this.fetchPoliticNews()
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

class TechScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.fetchTechNews = this.fetchTechNews.bind(this);
  }
  // Called after a component is mounted
  componentDidMount() {
    this.fetchTechNews();
   }

  fetchTechNews() {
    getTechNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
    },
      () => this.fetchTechNews()
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

class SportScreen extends React.Component {
    constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.fetchSportsNews = this.fetchSportsNews.bind(this);
  }
  // Called after a component is mounted
  componentDidMount() {
    this.fetchSportsNews();
   }

  fetchSportsNews() {
    getSportNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
    },
      () => this.fetchSportsNews()
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

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Politics: PoliticScreen,
  Tech: TechScreen,
  Sports: SportScreen,
});

export default createAppContainer(TabNavigator);

