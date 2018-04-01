import React from 'react';
import { Keyboard, View, Button, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { NavigationActions } from 'react-navigation';
import { createDeck } from '../utils/api'; 
import TextButton from './TextButton'
import { lightBlue } from '../utils/colors'

class NewDeckView extends React.Component {

    state = {
        deckName: ''
    }


    submit = () => {

        let { deckName } = this.state;
        const { dispatch, navigation } = this.props;
        deckName = deckName.trim();
        if (!deckName) {
            Alert.alert('ERROR', 'The deck name can not be an empty string!');
            return;
        } 

        const newDeck = {
            title: deckName,
            questions: []
        };

        const deck = {
            [deckName]: newDeck
        };

        Keyboard.dismiss();
        dispatch(addDeck(deck));
        createDeck(deck);
        this.setState({ deckName: '' });
       navigation.dispatch(NavigationActions.back());
       navigation.dispatch(NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'IndividualDeckView', params: { deck: newDeck } })
            ]
       }));
        
        
    }

    textChange = (deckName) => {
        this.setState({ deckName })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>What is the title of you new deck?</Text>
                <TextInput style={styles.input} autoFocus placeholder='Deck Title' value={this.state.deckName} onChangeText={this.textChange} />
                <View style={styles.button}>
                    <TextButton style={{ backgroundColor: lightBlue, }} onPress={this.submit} >
                        Add
                   </TextButton> 
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        padding: 20
    },
    input: {
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 20,
        fontSize: 20,
        width: 300
    },

});

export default connect()(NewDeckView);
