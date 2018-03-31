import React, { Component } from 'react'
import { connect } from 'react-redux';
import { StyleSheet, View, Button, Text } from 'react-native';

class IndividualDeckView  extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;
        return {
            title: deck.title
        };
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.deck != this.props.deck) {
            this.props.navigation.setParams({ deck: nextProps.deck });
        }
    }
    render() { 
        const { navigation } = this.props;
        const { deck } = navigation.state.params;
        let title = deck.title;
        let questions = deck.questions

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.columnCnt}>
                    <Text style={{ fontSize: 30 }}>{questions.length}</Text>
                    <Text style={styles.cards}>cards</Text>
                </View>
                <View style={styles.button}>
                    <Button title='add card' onPress={() => navigation.navigate('NewQuestionView', { deck})} />
                </View>
                {deck.questions.length > 0 &&
                    <View style={styles.button}>
                    <Button title='start quiz' color='#e74c3c' onPress={() => navigation.navigate('QuizView', { deck })} />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 35,
        margin: 30,
    },
    columnCnt: {
        flexDirection: 'row',
        margin: 20
    },
    cards: {
        color: '#888',
        fontSize: 30,
        paddingLeft: 10
    },
    button: {
        margin: 20,
        width: 300
    }
});


const mapStateToProps = (decks, { navigation }) => ({
    deck: decks[navigation.state.params.deck.title]
});

export default connect(mapStateToProps)(IndividualDeckView);