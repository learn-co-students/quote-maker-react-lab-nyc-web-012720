import uuid from 'uuid';

export default (state = [], action) => {
  let quoteId;
  let quote;

  switch(action.type){
    
    case "ADD_QUOTE":
      return [...state, action.quote]

    case "REMOVE_QUOTE":
      return state.filter(quote => quote.id !== action.quoteId);

    case "UPVOTE_QUOTE":
      quoteId = state.findIndex( quote => quote.id === action.quoteId)
      quote = state[quoteId]

      return [
        ...state.slice(0, quoteId),
        Object.assign({}, quote, { votes: quote.votes += 1 }),
        ...state.slice(quoteId + 1)
      ];

    case "DOWNVOTE_QUOTE":
      quoteId = state.findIndex( quote => quote.id === action.quoteId)
      quote = state[quoteId]

      if (quote.votes > 0) {
        return [
          ...state.slice(0, quoteId),
          Object.assign({}, quote, { votes: quote.votes -= 1 }),
          ...state.slice(quoteId + 1)
        ];
      }
      return state;


    default:
      return state;
  }
}
