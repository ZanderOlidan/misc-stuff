import sys
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import brown
from nltk.stem import WordNetLemmatizer

## Storage for Errors
def Error(code, word=''):
  codeToError = {
    0: "Spelling",
    1: "Capitalization",
    2: "Fragment",
    3: "Verb form",
    4: "Subject-verb agreement"
  }
  print("\t** %s error: %s" % (codeToError[code], word))

## Function for checking spelling
def checkSpelling(sentence):
  print ("Checking spelling...")
  # Use brown dictionary
  wordList = brown.words()
  wordSet = set(wordList)
  for w in word_tokenize(sentence):
    if w not in wordSet:
      Error(0, w)

def checkCapitalization(sentence):
  print ("Checking capitalization...")
  if sentence[0] != sentence[0].upper():
    Error(1, word_tokenize(sentence)[0]);

def checkFragment(sentence):
  print ("Checking if verb exists...")
  pos_tokenize = nltk.pos_tag(word_tokenize(sentence))
  verbs = []
  for wordSet in pos_tokenize:
    if 'V' in wordSet[1]:
      verbs.append(wordSet)
  if not len(verbs) > 0:
    Error(2)
  
def checkVerbForm(sentence):
  print ("Checking verb form...")
  lemmer = WordNetLemmatizer()
  pos_tokenize = nltk.pos_tag(word_tokenize(sentence))
  modal_verbs = ['TO', 'MD']
  prev_word = ('','')
  # checking if the word following 'to' has base form
  for wordSet in pos_tokenize:
    # Check base before to
    if wordSet[1] in modal_verbs and 'V' in prev_word[1]:
      if not prev_word[0] == lemmer.lemmatize(prev_word[0], 'v'):
        Error(3, prev_word[0])
    # Check base after to
    if prev_word[1] in modal_verbs and 'V' in wordSet[1]:
      if not wordSet[0] == lemmer.lemmatize(wordSet[1], 'v'):
        Error(3, wordSet[0])
    prev_word = wordSet
  
def checkPlurality(sentence):
  print ("Checking subject-verb agreement...")
  plural_nouns = ["NNPS", "NNS"]
  sing_verbs = ["VB", "VBP"]
  plural_verbs = ["VBZ"]
  sing_noun = ["NN", "NNP", "PRP"]
  pos_tokenize = nltk.pos_tag(word_tokenize(sentence))
  prev_word = ('', '')
  #print (pos_tokenize)
  for wordSet in pos_tokenize:
    word = wordSet[0]
    pos = wordSet[1]
    # Plural verb for singular noun 
    if pos in plural_verbs:
      if prev_word[1] in plural_nouns:
        Error(4, word)
    # Singular ver for plural noun
    if pos in sing_verbs and prev_word[0] != 'I':
      if prev_word[1] in sing_noun:
        Error(4, word)
    prev_word = wordSet
    
def main():
  ## Input check
  if len(sys.argv) < 2:
    print("Usage: python learnNLTK.py error.txt")
    exit()
  else:
    fileName = sys.argv[1]

  ## Open File
  file = open(fileName, 'r')

  ## Tokenize the sentence and Print
  sentences = sent_tokenize(file.read())
  for sentence in sentences:
    print (sentence)

  for sentence in sentences:
    print("\nChecking correctness of sentence: %s" % (sentence))
    checkSpelling(sentence)
    checkCapitalization(sentence)
    checkFragment(sentence)
    checkVerbForm(sentence)
    checkPlurality(sentence)

main()
