import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// 用户类型定义
interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  isPremium?: boolean;
  joinDate?: string;
  role?: string;
  isAdmin?: boolean;
  language_code?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

// 方法一：通过 Attachment Menu 获取用户信息
const getUserFromTelegramWebApp = (): User | null => {
  try {
    if (
      typeof window !== "undefined" &&
      window.Telegram &&
      window.Telegram.WebApp
    ) {
      const webAppUser = window.Telegram.WebApp.initDataUnsafe?.user;

      if (webAppUser) {
        return {
          id: webAppUser.id.toString(),
          username: webAppUser.username || "telegram_user",
          email: "", // Telegram 不直接提供邮箱
          firstName: webAppUser.first_name,
          lastName: webAppUser.last_name,
          avatar: "", // 需要通过其他方式获取头像
          language_code: webAppUser.language_code,
          isPremium: webAppUser.is_premium,
        };
      }
    }
    return null;
  } catch (error) {
    console.error("获取 Telegram WebApp 用户信息失败:", error);
    return null;
  }
};

// 方法二：通过 Inline Button Mini Apps 获取用户信息
const getUserFromTelegramInlineButton = (): User | null => {
  try {
    if (
      typeof window !== "undefined" &&
      window.Telegram &&
      window.Telegram.WebApp
    ) {
      const webAppUser = window.Telegram.WebApp.initDataUnsafe?.user;
      const queryId = window.Telegram.WebApp.initDataUnsafe?.query_id;

      if (webAppUser) {
        return {
          id: webAppUser.id.toString(),
          username: webAppUser.username || "telegram_user",
          email: "", // Telegram 不直接提供邮箱
          firstName: webAppUser.first_name,
          lastName: webAppUser.last_name,
          avatar: "", // 需要通过其他方式获取头像
          language_code: webAppUser.language_code,
          isPremium: webAppUser.is_premium,
        };
      }
    }
    return null;
  } catch (error) {
    console.error("获取 Telegram Inline Button 用户信息失败:", error);
    return null;
  }
};

// 检查是否在 Telegram 环境中
const isTelegramWebApp = (): boolean => {
  return !!( // Use double negation to ensure boolean return type
    typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp
  );
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 检查是否在Telegram环境中
        if (isTelegramWebApp()) {
          // 从 Telegram WebApp 获取用户信息（方法一）
          const telegramUser = getUserFromTelegramWebApp();

          // 如果方法一失败，尝试方法二
          const telegramUserAlt =
            telegramUser || getUserFromTelegramInlineButton();

          if (telegramUserAlt) {
            setUser(telegramUserAlt);
          } else {
            // 如果无法获取Telegram用户，使用模拟数据
            setUser({
              id: "12345",
              username: "demo_user",
              email: "demo@example.com",
              avatar: "/assets/images/default-avatar.png",
            });
          }
        } else {
          // 非Telegram环境，使用模拟数据
          setUser({
            id: "12345",
            username: "demo_user",
            email: "demo@example.com",
            avatar: "/assets/images/default-avatar.png",
          });
        }
      } catch (err) {
        console.error("获取用户信息失败:", err);
        setError("获取用户信息失败");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// 为 window 对象添加 Telegram 类型定义
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
          };
          query_id?: string;
        };
      };
    };
  }
}

// REMOVE the duplicate definition below
// const isTelegramWebApp = (): boolean => {
//   return (
//     typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp
//   );
// };
