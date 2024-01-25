import React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { spacing } from './sizes';
import { theme } from './themes';

export const styles = StyleSheet.create({
  //HotTradesScreen.js, NewScreen.js, PaperTradingScreen.js, SettingsScreen.js, SignalScreen.js, CryptoNews.js, StockNews.js
  //AboutInfo.js, AppSettings.js, ContactUs.js, MyAccount.js, MyAlerts.js, Subscriptions.js, CryptoSignals.js, StockSignals.js
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: theme.backGround,
  },

  accountTextInput: {
    marginHorizontal: 40,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'dimgrey',
  },

  dropdownCountry: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  dropdown: {
    borderColor: '#B7B7B7',
    height: 50,
  },
  placeholderStyles: {
    color: 'grey',
  },

  //
  textBlockView: {
    margin: 20,
  },
  textBlockText: {
    textAlign: 'justify',
  },

  //MyAccountScreen.js
  myAccountScroll: {
    padding: 10,
    paddingTop: 20,
  },

  //Header.js, SignalScreen.js
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.xsm,
    backgroundColor: theme.logoBackground,
    borderRadius: 25,
    borderColor: theme.border,
    borderWidth: 2,
  },
  logo: {
    flex: 0.1,
    paddingLeft: 6,
    height: 45,
    justifyContent: 'center',
    resizeMode: 'contain',
    margin: 2,
  },
  companyHeader: {
    flex: 0.9,
    flexDirection: 'row',
  },
  sg: {
    flex: 0.26,
    height: 45,
    resizeMode: 'contain',
  },
  longDescription: {
    flex: 0.74,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //Header.js
  centerText: {
    textAlign: 'center',
  },

  //SignalScreen.js
  longDesc: {
    height: 32,
    resizeMode: 'contain',
  },

  //SignalScreen.js, NewsScreen.js
  topTabGroupView: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  topTabOnView: {
    flex: 0.5,
    backgroundColor: 'lightsteelblue',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: 'royalblue',
    borderTopColor: 'royalblue',
    borderRightColor: 'royalblue',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  topTabOffView: {
    flex: 0.5,
    backgroundColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'royalblue',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  threeTabOnView: {
    flex: 0.3333,
    backgroundColor: 'lightsteelblue',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: 'royalblue',
    borderTopColor: 'royalblue',
    borderRightColor: 'royalblue',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  threeTabOffView: {
    flex: 0.3333,
    backgroundColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'royalblue',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  topTabOnText: {
    textAlign: 'center',
  },
  topTabOffText: {
    textAlign: 'center',
    color: 'lightgrey',
  },
  topTabTouch: {
    paddingVertical: 10,
  },
  dataContainerView: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: 'royalblue',
    borderBottomColor: 'royalblue',
    borderRightColor: 'royalblue',
  },
  favoritesContainer: {
    marginTop: 20,
  },

  //HotTradesScreen.js
  hotTradesScroll: {
    //alignContent: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
    borderColor: 'royalblue',
    borderWidth: 3,
  },

  hotTradesOutterRingView: {
    borderRadius: 25,
    margin: 8,
    backgroundColor: 'grey',
    borderWidth: 1,
  },
  hotTradesRingSummitView: {
    borderRadius: 23,
    margin: 2,
    backgroundColor: 'dimgrey',
  },
  hotTradesInnerRingView: {
    borderRadius: 22,
    margin: 3,
    backgroundColor: 'slategrey',
  },
  hotTradesDisplayRingView: {
    flexDirection: 'row',
    borderRadius: 16,
    margin: 5,
    backgroundColor: 'lightgrey',
    borderWidth: 1,
  },
  hotTradesUsernameView: {
    flex: 0.5,
    alignItems: 'center',
  },
  hotTradesInfoView: {
    flex: 0.25,
    alignItems: 'center',
  },
  hotTradesText: {
    paddingVertical: 10,
  },

  //PaperTrades, Hot Trades
  addNewButtonView: {
    height: 40,
    backgroundColor: 'royalblue',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 120,
    border: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },

  //PaperTradingScreen.js, CryptoSignals.js, StockSignals.js
  dataHeaderGroupView: {
    flexDirection: 'row',
    backgroundColor: theme.backGround,
  },
  tickerHeaderView: {
    flex: 0.3,
    paddingRight: 25,
  },
  tickerHeaderText: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'royalblue',
  },
  dataHeaderView: {
    flex: 0.23,
    alignItems: 'center',
  },
  dataHeaderText: {
    fontWeight: 'bold',
    color: 'royalblue',
  },
  dataGroupView: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  tickerView: {
    flex: 0.3,
    paddingRight: 30,
  },
  tickerText: {
    textAlign: 'right',
  },
  dataView: {
    flex: 0.23,
    alignItems: 'center',
  },

  //PaperTradingScreen
  paperContainer: {
    flex: 1,
    backgroundColor: 'lightyellow', //'#F7F093',
    marginHorizontal: 15,
  },
  notebookHeaderView: {
    backgroundColor: 'saddlebrown',
  },
  paperHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 5,
    textAlign: 'center',
    fontFamily: 'Bradley Hand',
  },
  paperTradesHeaderGroupView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#96BEF5',
  },
  paperMarginView: {
    flex: 0.09,
  },
  paperLineView: {
    flex: 0.01,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: 'red',
    borderRightColor: 'red',
  },
  paperTickerHeaderView: {
    flex: 0.25,
    paddingRight: 20,
  },
  paperDataHeaderView: {
    flex: 0.22,
    alignItems: 'center',
  },
  paperTradesGroupView: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#96BEF5',
  },
  paperTickerView: {
    flex: 0.25,
    paddingRight: 20,
    alignSelf: 'center',
  },
  paperDataView: {
    flex: 0.22,
    alignSelf: 'center',
  },
  paperTickerHeaderText: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'royalblue',
    fontFamily: 'Bradley Hand',
    fontSize: 18,
  },
  paperTickerText: {
    textAlign: 'right',
    fontFamily: 'Bradley Hand',
    fontSize: 16,
  },
  paperDataHeaderText: {
    fontWeight: 'bold',
    color: 'royalblue',
    fontFamily: 'Bradley Hand',
    fontSize: 18,
  },
  paperDataText: {
    textAlign: 'center',
    fontFamily: 'Bradley Hand',
    fontSize: 16,
  },
  sellButtonView: {
    backgroundColor: 'royalblue',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    border: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },

  //SettingsScreen.js
  settingsTab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.tab,
    margin: 3,
    height: 40,
    border: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  settingsLink: {
    flex: 1,
  },
  levelHeader: {
    marginLeft: 5,
  },
  levelText: {
    alignText: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'royalblue',
  },
  columnView: {
    flexDirection: 'column',
  },
  alignRightText: {
    textAlign: 'right',
  },
  alignCenterText: {
    textAlign: 'center',
  },
  subscriptionGenieView: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'royalblue',
  },
  subscriptionGenieText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'royalblue',
  },
  subscriptionUpgradeView: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'royalblue',
  },
  subscriptionUpgradeLeftView: {
    flex: 0.5,
    justifyContent: 'center',
  },
  subscriptionUpgradeRightView: {
    flex: 0.5,
  },
  subscriptionUpgradeText: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'royalblue',
  },
  avatarIconView: {
    alignSelf: 'center',
    borderColor: 'royalblue',
    borderRadius: 50,
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 20,
  },
  avatarIconImage: {
    height: 90,
    width: 90,
  },
  alignCenterView: {
    alignSelf: 'center',
  },

  //AboutInfo.js, Subscriptions.js
  dropTab: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.tab,
    margin: 10,
    height: 40,
  },
  downArrow: {
    height: 5,
    resizeMode: 'contain',
  },
  displayContainer: {
    textAlign: 'justify',
  },
  displayText: {
    textAlign: 'justify',
    marginLeft: 20,
    marginRight: 20,
    color: 'royalblue',
  },

  //Subscriptions.js
  verticalMarginScroll: {
    marginVertical: 10,
  },

  //CryptoNews.js, StockNews.js
  newsTab: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 15,
    padding: 5,
    backgroundColor: theme.tab,
    minHeight: 40,
    border: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  newsLink: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'center',
  },
  newsTabText: {
    textAlign: 'justify',
  },
  articleView: {
    backgroundColor: theme.backGround,
  },
  articleText: {
    marginHorizontal: 20,
    textAlign: 'justify',
  },

  //SettingsScreen.js, CryptoNews.js, StockNews.js
  right: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5,
    backgroundColor: theme.tab,
  },
  rightArrow: {
    height: 15,
    width: 20,
    resizeMode: 'contain',
  },

  //SettingsScreen.js, AboutInfo.js, Subscriptions.js
  space: {
    marginTop: 15,
  },

  //SettingsScreen.js
  actionHeader: {
    marginLeft: 15,
  },
  actionText: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'royalblue',
  },
  icon: {
    flex: 0.1,
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },

  //AboutInfo.js
  disclaimerTitle: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 10,
  },
  disclaimer: {
    textAlign: 'justify',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 8,
  },

  //Button.js
  button: {
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    color: 'white',
  },

  //MyAlerts.js
  alertsTextView: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  newsLetterContainerView: {
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 15,
    marginBottom: 5,
  },
  newsLetterTextView: {
    flex: 0.5,
    flexDirection: 'row',
  },
  newsLetterSwitchView: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  alertMeView: {
    padding: 10,
  },
  switchContainerView: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 15,
    marginBottom: 5,
  },
  switchLabelView: {
    flex: 0.5,
    flexDirection: 'row',
  },
  switchView: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  upgradeFontText: {
    fontSize: 10,
  },

  //ContactUs.js
  welcomeLabelView: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  welcomeLabelText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paragraphBlockView: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  dropDownView: {
    flex: 0.3,
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  dropDownText: {
    marginBottom: 10,
  },
  dropDownBackColor: {
    backgroundColor: 'gainsboro',
  },
  sendEmailButtonView: {
    height: 40,
    backgroundColor: 'royalblue',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 100,
    border: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },

  //AppSettings.js
  blockLabelView: {
    marginTop: 20,
  },
  switchBlockView: {
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
  },
  settingsSwitchLabelView: {
    flex: 0.2,
  },
  settingsSwitchView: {
    flex: 0.8,
    marginRight: 20,
    alignItems: 'flex-end',
  },
  trackColorSwitch: {
    false: 'azure',
    true: 'royalblue',
  },
  hiddenBlockView: {
    marginLeft: 50,
  },
  hiddenSwitchBlockView: {
    marginRight: 25,
    marginBottom: 3,
    flexDirection: 'row',
  },
  hiddenSwitchView: {
    flex: 0.8,
    marginRight: 20,
    alignItems: 'flex-end',
  },

  //AboutInfo.js
  appInfoLabelView: {
    paddingLeft: 10,
    paddingBottom: 8,
  },
  appInfoLabelText: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'royalblue',
  },
  stactGenieLabelText: {
    fontSize: 15,
  },
  revLevelView: {
    paddingLeft: 10,
    paddingBottom: 8,
  },
  learnMoreLabelView: {
    marginLeft: 25,
  },

  //PersonalData.js
  personalDataBlockView: {
    padding: 10,
  },
  addAccountLabelView: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  personalInputBlockView: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  personalInputLabelView: {
    flex: 0.3,
  },
  personalInputInputView: {
    flex: 0.6,
    justifyContent: 'right',
    borderBottomWidth: 1,
  },
  savePersonalButtonView: {
    alignItems: 'center',
    margin: 10,
  },
  savePersonalButtonTouch: {
    borderRadius: 15,
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  savePersonalButtonText: {
    color: 'white',
  },
  personalDataLineView: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  personalDataLabelView: {
    flex: 0.4,
  },
  personalDataDisplayView: {
    flex: 0.6,
    justifyContent: 'right',
  },

  //ProfileData.js
  profileDataBlockView: {
    padding: 10,
  },
  addProfileLabelView: {
    paddingVertical: 20,
  },
  profileInputBlockView: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  profileInputLabelView: {
    flex: 0.3,
  },
  profileInputInputView: {
    flex: 0.6,
    justifyContent: 'right',
    borderBottomWidth: 1,
  },
  saveProfileButtonView: {
    alignItems: 'center',
    margin: 10,
  },
  saveProfileButtonTouch: {
    borderRadius: 15,
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  saveProfileButtonText: {
    color: 'white',
  },
  profileDataLineView: {
    flexDirection: 'row',
    padding: 5,
  },
  profileDataLabelView: {
    flex: 0.4,
    justifyContent: 'center',
  },
  profileDataDisplayView: {
    flex: 0.6,
    padding: 5,
    borderWidth: 1,
    borderColor: 'dimgrey',
    borderRadius: 10,
    justifyContent: 'right',
  },
  profileDataEditView: {
    flex: 0.6,
    padding: 5,
    borderWidth: 2,
    borderColor: 'royalblue',
    borderRadius: 10,
    justifyContent: 'right',
  },
  profileDataDisplayText: {
    marginRight: 10,
    textAlign: 'right',
  },

  //-----------------------------------------------------------------------------------ADD HERE ------------------------------------------------------------------------------
  //AppSettings.js THIS IS FOR THE EDIT BUTTON--------------------------------------------------
  editBlockTouch: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  editBlockImage: {
    margin: 5,
    height: 15,
    width: 15,
  },
  editBlockText: {
    alignSelf: 'center',
  },
  //-------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------UNUSED---------------------------------------------------------------------------------
  cryptoHeader: {
    flex: 0.37,
    //alignText: 'center',
    //overflow: 'hidden',
    color: theme.activeIcon,
    fontWeight: 'bold',
    backgroundColor: 'red',
  },
  signalHeader: {
    flex: 0.23,
    textAlign: 'center',
    fontSize: 13,
    color: theme.activeIcon,
    fontWeight: 'bold',
  },
  cryptoGroup: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: theme.backGround,
    paddingTop: 5,
    marginLeft: spacing.md,
    marginRight: 19,
  },
  crypto: {
    flex: 0.25,
    marginLeft: 13,
    paddingRight: 5,
    marginTop: 2,
  },
  cryptoText: {
    textAlign: 'right',
  },
  signalsSpacer: {
    flex: 0.15,
  },
  signal: {
    flex: 0.2,
    margin: spacing.xxsm,
    paddingLeft: 10,
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.xsm,
    backgroundColor: theme.logoBackground,
    borderRadius: 25,
    borderColor: theme.border,
    borderWidth: 2,
  },
  newsLogo: {
    flex: 0.1,
    height: 45,
    justifyContent: 'center',
    resizeMode: 'contain',
    margin: 2,
  },
  newsCompanyHeader: {
    flex: 0.9,
    flexDirection: 'row',
  },
  news: {
    flex: 0.3,
    height: 45,
    resizeMode: 'contain',
  },
  newsDescription: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.tab,
    margin: 10,
    height: 40,
  },
  down: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5,
    backgroundColor: theme.tab,
  },
  disclaimerSpace: {
    marginTop: 5,
  },
  pageTab: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: theme.tab,
    marginTop: 10,
    alignItems: 'center',
    borderTopColor: theme.backGround,
    borderBottomColor: theme.backGround,
    borderTopWidth: 0.02,
    borderBottomWidth: 0.02,
  },
  sendIcon: {
    flex: 0.1,
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  pageLink: {
    fontFamily: 'Times New Roman',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  display: {
    backgroundColor: theme.logoBackground,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    width: 170,
    borderColor: theme.border,
    borderWidth: '2',
  },
  //----------------------------------------------------------------------------------------------------------------REMOVE ABOVE
  input: {
    borderStyle: 'solid',
    borderColor: 'dimgrey',
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 15,
    height: 35,
    marginHorizontal: 40,
    marginBottom: 10,
  },
  label: {
    marginLeft: 15,
    marginBottom: 7,
  },
  getStarted: {
    backgroundColor: '#5188E3',
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
  },
  logIn: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  links: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#758580',
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: Constants.statusBarHeight,
    marginBottom: 25,
  },
  backArrow: {
    marginLeft: 10,
  },
  title: {
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    marginRight: 40,
  },
  signalText: {
    textAlign: 'center',
  },
  levelDisplay: {
    flexDirection: 'row',
    margin: 5,
  },
});
