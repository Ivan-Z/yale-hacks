import React from 'react';
import { FlatList, WebView, View } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';

import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';


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

class MyWeb extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <React.Fragment>
      <WebView
        source={{uri: 'https://github.com/facebook/react-native'}}
        style={{marginTop: 20}}
      />
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Home')}
      />
      </React.Fragment>
    );
  }
}


const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Politics: PoliticScreen,
  Tech: TechScreen,
  Sports: SportScreen,
});

const App = createStackNavigator({
  Article: {screen: MyWeb},
  Home: {screen: TabNavigator},
  
})



export default createAppContainer(App);


