import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const supportSchema = new Schema({
  ownerID: String,
  sems: Array,
  status: String,
  newWordCnt: Number,
  deletedWordCnt: Number,
  lastTags: Array,
  recommandedTags: Array,
  wordOrderPref: String, // asc or desc
  yearOrderPref: String, // asc or desc
  wordDisplayPref: String, // wordcard or list (or others even)
  isDarkMode: Boolean
});

export default mongoose.model('supports', supportSchema); 