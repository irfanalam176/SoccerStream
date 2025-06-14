// styles.js
import { StyleSheet } from 'react-native';

export const Colors = {
  primary: '#242625',
  secondary: '#0FB245',
  background: '#F5F5F5',
  textPrimary: '#FEFFFE',
  textSecondary: '#B1B2B4',
  danger: '#FF4C4C',
  success: '#32CD32',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#37383A',
  darkGray: '#666666',
};

export const style = StyleSheet.create({
  wrapper:{
    padding:12,
    backgroundColor:Colors.primary,
    minHeight:"100%"
  },
  searchBar:{
    backgroundColor:Colors.lightGray,
    borderWidth:1,
    borderColor:Colors.secondary,
    borderRadius:10,
    paddingHorizontal:10,
    paddingStart:50,
    marginBottom:10
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginVertical:10
  },
  heading2: {
    marginVertical:10,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  heading3: {
    marginVertical:10,
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  body: {
    fontSize: 16,
    color: Colors.primary,
  },
  smallText:{
    fontSize:12,
    color:Colors.white
  },
  links:{
        fontSize:12,
    color:Colors.secondary
  },
  caption: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  bold: {
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  },
  row: {
    display:"flex",
    flexDirection: 'row',
  },
  column: {
    display:"flex",
    flexDirection: 'column',
  },
  centered: {
    display:"flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerRow: {
    display:"flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap:15
  },
  team: {
    alignItems: 'center',
  },
  noGap:{
gap:0
},
spaceBetween: {
    display:"flex",
    justifyContent: 'space-between',
    flexDirection:"row",
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
 card: {     
  borderRadius: 13,                
  padding: 16,                   
  marginVertical: 5,              
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 6,              
},
upcommingMatcheCard:{
  backgroundColor:Colors.darkGray,
  padding:10,
  borderRadius:10,
  marginVertical: 1,              
  elevation: 6,   
  position:"relative"           
},
upcommingMatchDate:{
  position:"absolute",
  top:10,
  left:10
},
cardContent:{
  paddingHorizontal:25
},
  primaryBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryBtn: {
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerBtn: {
    backgroundColor: Colors.danger,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  blankPadding:{paddingBottom:50},
  gap1:{gap:4},
  gap2:{gap:8},
  gap3:{gap:12},
  mt1: { marginTop: 4 },
  mt2: { marginTop: 8 },
  mt3: { marginTop: 12 },
    mt4:{marginTop:20},
  mb1: { marginBottom: 4 },
  mb2: { marginBottom: 8 },
  mb3: { marginBottom: 12 },
  mb4:{marginBottom:14},
  pt1: { paddingTop: 4 },
  pt2: { paddingTop: 8 },
  pt3: { paddingTop: 12 },
  pb1: { paddingBottom: 4 },
  pb2: { paddingBottom: 8 },
  pb3: { paddingBottom: 12 },
  p1: { padding: 4 },
  p2: { padding: 8 },
  p3: { padding: 12 },
  px1: { paddingHorizontal: 4 },
  px2: { paddingHorizontal: 8 },
  px3: { paddingHorizontal: 12 },


  // custom styling
  cardsContainer:{
    height:500,
    backgroundColor:Colors.lightGray,
    padding:10,
    paddingBottom:50,
    borderRadius:10
  },
  searchIcon:{
    position:"absolute",
    top:12,
    left:10,
    zIndex:99
  },
  venueText:{
    borderBottomWidth:2,
    borderBottomColor:Colors.secondary,
    marginBottom:10
  },
  playerImage:{
    marginHorizontal:"auto",
    width:300,
    height:300,
    objectFit:"contain",
  },
  playerCard:{
    backgroundColor:Colors.black,
    padding:20,
    borderRadius:20,
    marginVertical:20
  },
  border:{
    borderBottomWidth:1,
    borderBottomColor:Colors.lightGray
  }
});


