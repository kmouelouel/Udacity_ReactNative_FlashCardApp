// utils/api.js
import { AsyncStorage } from 'react-native';
import { formatDecks, DECKS_STORAGE_KEY } from './deck';

export function fetchDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(r => formatDecks(r));
}

export function createDeck(deck) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
}
export function addNewCard (deck) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
}
export function clearStorage() {
    return AsyncStorage.clear();
}
