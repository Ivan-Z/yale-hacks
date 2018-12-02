import React from 'react';
import { Linking, FlatList, WebView, View,TouchableHighlight } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';

import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';


import { getNews } from './src/components/new.js';
import { getTechNews } from './src/components/tech.js';
import { getPoliticsNews } from './src/components/politics.js';
import { getSportNews } from './src/components/sports.js';
//import Article from './src/components/Article.js';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.fetchNews = this.fetchNews.bind(this);
    this.navigateFunc = this.navigateFunc.bind(this);
  }
  // Called after a component is mounted
  componentDidMount() {
    this.fetchNews();
   }

   navigateFunc(x) {
    this.props.navigation.navigate("DetailView", {url: x});
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
        renderItem={({ item }) => <Article article={item} navigateFunc={this.navigateFunc} />}
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
    this.navigateFunc = this.navigateFunc.bind(this);
  }

     navigateFunc(x) {
    // this.setState({goToWeb: x})
    this.props.navigation.navigate("DetailView", {url: x});
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
        if (this.state.goToWeb){
      let url = this.state.goToWeb
      return  (<WebView
              source={{uri: url}}
              style={{marginTop: 20}}
            />)
    }
    return (
      <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} navigateFunc={this.navigateFunc} />}
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
    this.navigateFunc = this.navigateFunc.bind(this);
  }

     navigateFunc(x) {
    // this.setState({goToWeb: x})
    this.props.navigation.navigate("DetailView", {url: x});
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
        renderItem={({ item }) => <Article article={item} navigateFunc={this.navigateFunc} />}
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
    this.navigateFunc = this.navigateFunc.bind(this);
  }

     navigateFunc(x) {
    // this.setState({goToWeb: x})
    this.props.navigation.navigate("DetailView", {url: x});
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
        renderItem={({ item }) => <Article article={item} navigateFunc={this.navigateFunc}/>}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
  );
  }
}

class MyWeb extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: this.props.navigation.state.params.url
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <React.Fragment>
      <WebView
        source={{uri: this.state.url}}
        style={{marginTop: 20}}
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
  Home: {screen: TabNavigator},
  DetailView: {screen: MyWeb},
})

class Article extends React.Component {

  render() {

    const {
      title,
      description,
      publishedAt,
      source,
      urlToImage,
      url
    } = this.props.article;
    const { noteStyle, featuredTitleStyle } = styles;
    const time = moment(publishedAt || moment.now()).fromNow();
    const defaultImg =
    'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';

    // const {navigate} = this.props.navigation;

    return (
      <TouchableHighlight
        useForeground
        onPress={() => this.props.navigateFunc(url)}
      >
        <Card
          featuredTitle={title}
          featuredTitleStyle={featuredTitleStyle}
          image={{
            uri: urlToImage || defaultImg
          }}
        >
          <Text style={{ marginBottom: 10 }}>
            {description || 'Read More..'}
          </Text>
          <Divider style={{ backgroundColor: '#dfe6e9' }} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={noteStyle}>{source.name.toUpperCase()}</Text>
            <Text style={noteStyle}>{time}</Text>
          </View>
        </Card>
      </TouchableHighlight>
    );
  }

}



const styles = {
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#b2bec3',
    fontSize: 10
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: '#00000f',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3
  }
};

export default createAppContainer(App);


