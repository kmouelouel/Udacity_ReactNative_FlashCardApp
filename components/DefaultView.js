import React, { Component } from 'react';
import {
    FlatList,
    ListView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks} from '../actions';
import { fetchDecks, clearStorage} from '../utils/api';
import DeckDetail from './DeckDetail';
import { white, blue } from '../utils/colors';
import { AppLoading } from 'expo'

class DefaultView extends Component {

    state = {
        ready: false,
    }
    componentDidMount() {
        const { dispatch } = this.props
         fetchDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({ ready: true })))
    }
     renderEmptyDate(formattedDate) {
        return (
            <View style={styles.item}> 
                <Text style={styles.noDataText}>
                    An error occurred \uD83D\uDE1E
               </Text>
          </View>
        )
    }
    render() {
        const { navigation, decks, dispatch } = this.props;
        const { ready } = this.state
        if (ready === false) {
            return <AppLoading />
        }
        return (
            <View> 
                <FlatList
                    data={Object.values(decks).sort((a, b) => a.title > b.title)}
                    renderItem={({ item }) => <DeckDetail deck={item} navigation={navigation} />}
                    keyExtractor={(item, index) => index}
                    renderEmptyDate={this.renderEmptyDate}
                />
            </View>
        );
    }
}

 

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
});

function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(
    mapStateToProps,
)(DefaultView)