import filter from 'leo-profanity'

filter.list()

// remove all bad words from the filter
// now the filter can't filter anything cause there are no bad words
filter.clearList()

// adding word (from builtin dictionary) into the filter
filter.add(filter.getDictionary('en'))
filter.add(filter.getDictionary('ru'))

// now in this state
// the filter includes all bad words across 3 languages available
filter.list()

export const hasProfanity = (text) => {
  return filter.check(text)
}
