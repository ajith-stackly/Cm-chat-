import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';

import ChatsPage from './pages/ChatsPage';
import ChatConversation from './pages/ChatConversation';
import ArchivedPage from './pages/ArchivedPage';
import GroupsPage from './pages/GroupsPage';
import GroupConversation from './pages/GroupConversation';
import CallsPage from './pages/CallsPage';
import StatusPage from './pages/StatusPage';
import StatusViewer from './pages/StatusViewer';
import SettingsPage from './pages/SettingsPage';
import SettingsProfile from './pages/settings/SettingsProfile';
import SettingsNotifications from './pages/settings/SettingsNotifications';
import SettingsPrivacy from './pages/settings/SettingsPrivacy';
import SettingsPrivacyChoice from './pages/settings/SettingsPrivacyChoice';
import SettingsBlocked from './pages/settings/SettingsBlocked';
import SettingsSecurity from './pages/settings/SettingsSecurity';
import SettingsWallpaper from './pages/settings/SettingsWallpaper';
import SettingsAccountInfo from './pages/settings/SettingsAccountInfo';
import SettingsHelp from './pages/settings/SettingsHelp';

function Shell({ children }) {
  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 md:flex-row">
      <Sidebar />
      <div className="flex flex-1 min-w-0 pb-[62px] md:pb-0">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Navigate to="/chats" replace />} />

            <Route path="/chats" element={<ChatsPage />}>
              <Route path=":id" element={<ChatConversation />} />
            </Route>

            <Route path="/archived" element={<ArchivedPage />}>
              <Route path=":id" element={<ChatConversation />} />
            </Route>

            <Route path="/groups" element={<GroupsPage />}>
              <Route path=":id" element={<GroupConversation />} />
            </Route>

            <Route path="/calls" element={<CallsPage />} />

            <Route path="/status" element={<StatusPage />}>
              <Route path=":id" element={<StatusViewer />} />
            </Route>

            <Route path="/settings" element={<SettingsPage />}>
              <Route path="profile" element={<SettingsProfile />} />
              <Route path="notifications" element={<SettingsNotifications />} />
              <Route path="privacy" element={<SettingsPrivacy />} />
              <Route path="privacy/blocked" element={<SettingsBlocked />} />
              <Route path="privacy/:section" element={<SettingsPrivacyChoice />} />
              <Route path="security" element={<SettingsSecurity />} />
              <Route path="wallpaper" element={<SettingsWallpaper />} />
              <Route path="account-info" element={<SettingsAccountInfo />} />
              <Route path="help" element={<SettingsHelp />} />
            </Route>

            <Route path="*" element={<Navigate to="/chats" replace />} />
          </Routes>
        </Shell>
      </HashRouter>
    </AppProvider>
  );
}
