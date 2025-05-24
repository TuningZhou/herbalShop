import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

// 定义个人资料类型
interface ProfileData {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isPremium: string;
  joinDate: string;
  language?: string;
}

const Profile: React.FC = () => {
  const { user, loading, error } = useUser();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData>({
    id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    isPremium: "No",
    joinDate: "",
  });

  // 当用户信息加载完成后，更新个人资料
  useEffect(() => {
    if (!loading && user) {
      // 使用从Telegram SDK获取的用户信息
      setProfile({
        id: user.id,
        username: user.username,
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        isPremium: user.isPremium ? "Yes" : "No",
        joinDate: new Date().toISOString().split("T")[0],
        language: user.language_code,
      });
    }
  }, [user, loading]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!user) return <div>未找到用户信息</div>;

  return (
    <div className="profile-page">
      <h1>用户资料</h1>

      <div className="profile-card">
        <img
          src={user.avatar || "/src/assets/images/avatars/avatar@2x.png"}
          alt="avatar"
          className="avatar"
        />

        <div className="profile-info">
          <p>
            <strong>用户名:</strong> {profile.username}
          </p>
          {profile.firstName && (
            <p>
              <strong>名字:</strong> {profile.firstName}
            </p>
          )}
          {profile.lastName && (
            <p>
              <strong>姓氏:</strong> {profile.lastName}
            </p>
          )}
          <p>
            <strong>邮箱:</strong> {profile.email}
          </p>
          <p>
            <strong>高级用户:</strong> {profile.isPremium}
          </p>
          {profile.language && (
            <p>
              <strong>语言:</strong> {profile.language}
            </p>
          )}
          <p>
            <strong>注册日期:</strong> {profile.joinDate}
          </p>
        </div>
      </div>

      <button className="back-button" onClick={() => window.history.back()}>
        返回
      </button>
    </div>
  );
};

export default Profile;
