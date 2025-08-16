import AppContent from './src/AppContent/AppContent';
import { ContextWrapper } from './src/context/ContextWrapper';
import { userNotification } from './src/Notification/useNotification';

// create a component
const App = () => {
  userNotification(); //function for enabling and getting permission firbase cloud messaging (FCM)
  return (
    <ContextWrapper>
      <AppContent />
    </ContextWrapper>
  );
};

//make this component available to the app
export default App;
