import { 
  Briefcase, MapPin, Laptop, Building2, Terminal, User, FileText, Target, CheckSquare, MessageCircle, 
  AlertCircle, Bookmark, Star, Calendar, Flag, Hash, Info, Layers, Handshake, Monitor, Phone, Mail, Award, 
  Rocket, Presentation, Heart, Coffee, Train, Bus, Car, BookOpen, Search, Video, Mic, Edit3, Smile, 
  ThumbsUp, Users, Clock, GraduationCap, School, Library, Pencil, Activity, Utensils, MessageSquare, 
  Send, PhoneCall, Sun, Moon, CloudRain, PartyPopper, Gift, Wallet, Ticket, Umbrella, Glasses, 
  Lightbulb, Music, Camera, Scissors, Shirt, Frown, Meh, AlertTriangle, Plane, Bike, History, Bell
} from 'lucide-react';
import { useTasks } from '@/context/TaskContext';

// group: 'schedule' = スケジュール系, 'task' = タスク系, 'both' = 両方
export const ICONS = {
  // --- スケジュール系 ---
  Building2:    { icon: Building2,    label: 'ビル / 会社',           group: 'schedule' },
  Presentation: { icon: Presentation, label: 'プレゼン / 説明会',     group: 'schedule' },
  Monitor:      { icon: Monitor,      label: 'モニター / オンライン',  group: 'schedule' },
  Handshake:    { icon: Handshake,    label: '握手 / 内定・面談',      group: 'schedule' },
  Video:        { icon: Video,        label: 'ビデオ / 録画面接',      group: 'schedule' },
  Mic:          { icon: Mic,          label: 'マイク / 面接練習',      group: 'schedule' },
  PhoneCall:    { icon: PhoneCall,    label: '通話 / 電話面談',        group: 'schedule' },
  Users:        { icon: Users,        label: 'グループ / OB訪問・GD',  group: 'schedule' },
  GraduationCap:{ icon: GraduationCap,label: '帽子 / 卒業・学位',     group: 'schedule' },
  School:       { icon: School,       label: '学校 / 大学・授業',      group: 'schedule' },
  MapPin:       { icon: MapPin,       label: 'ピン / 目的地',          group: 'schedule' },
  Train:        { icon: Train,        label: '電車 / 移動',            group: 'schedule' },
  Bus:          { icon: Bus,          label: 'バス / 移動',            group: 'schedule' },
  Car:          { icon: Car,          label: '車 / ドライブ',          group: 'schedule' },
  Plane:        { icon: Plane,        label: '飛行機 / 遠征',          group: 'schedule' },
  Calendar:     { icon: Calendar,     label: 'カレンダー / 予定',      group: 'schedule' },
  Camera:       { icon: Camera,       label: 'カメラ / 証明写真',      group: 'schedule' },
  Coffee:       { icon: Coffee,       label: 'カフェ / 休憩・OB訪問', group: 'schedule' },
  Utensils:     { icon: Utensils,     label: '食事 / 懇親会',         group: 'schedule' },
  Ticket:       { icon: Ticket,       label: 'チケット / イベント',    group: 'schedule' },
  PartyPopper:  { icon: PartyPopper,  label: 'クラッカー / お祝い',    group: 'schedule' },

  // --- タスク系 ---
  CheckSquare:  { icon: CheckSquare,  label: 'チェック / webテスト',  group: 'task' },
  FileText:     { icon: FileText,     label: '書類 / ES・履歴書',     group: 'task' },
  Edit3:        { icon: Edit3,        label: 'ペン / 筆記試験',       group: 'task' },
  Pencil:       { icon: Pencil,       label: '鉛筆 / 記録',           group: 'task' },
  Search:       { icon: Search,       label: '虫眼鏡 / 企業研究',     group: 'task' },
  BookOpen:     { icon: BookOpen,     label: '本 / 勉強・提出物',     group: 'task' },
  Library:      { icon: Library,      label: '図書館 / 自習・研究',   group: 'task' },
  Target:       { icon: Target,       label: '的 / 目標',             group: 'task' },
  Flag:         { icon: Flag,         label: '旗 / マイルストーン',   group: 'task' },
  Bell:         { icon: Bell,         label: 'ベル / リマインダー',   group: 'task' },
  AlertCircle:  { icon: AlertCircle,  label: '注意 / 必須',           group: 'task' },
  AlertTriangle:{ icon: AlertTriangle,label: '警告 / 緊急・要対応',   group: 'task' },
  Clock:        { icon: Clock,        label: '時計 / 期限・締切',     group: 'task' },
  Send:         { icon: Send,         label: '送信 / 提出・投函',     group: 'task' },
  Mail:         { icon: Mail,         label: 'メール / お礼状',       group: 'task' },
  Phone:        { icon: Phone,        label: '電話 / 確認連絡',       group: 'task' },
  Wallet:       { icon: Wallet,       label: '財布 / 交通費・出費',   group: 'task' },
  Glasses:      { icon: Glasses,      label: 'メガネ / 集中・作業',   group: 'task' },
  Lightbulb:    { icon: Lightbulb,    label: '電球 / アイデア',       group: 'task' },
  Shirt:        { icon: Shirt,        label: 'シャツ / 準備',         group: 'task' },
  Scissors:     { icon: Scissors,     label: 'ハサミ / 美容室',       group: 'task' },
  History:      { icon: History,      label: '履歴 / 過去の記録',     group: 'task' },

  // --- 共通 (both) ---
  Briefcase:    { icon: Briefcase,    label: '鞄 / 仕事',             group: 'both' },
  Star:         { icon: Star,         label: '星 / 重要',             group: 'both' },
  Heart:        { icon: Heart,        label: 'ハート / 本命',         group: 'both' },
  Award:        { icon: Award,        label: '賞 / 合格・内定',       group: 'both' },
  ThumbsUp:     { icon: ThumbsUp,     label: 'いいね / 良い結果',     group: 'both' },
  User:         { icon: User,         label: '人物 / 担当者',         group: 'both' },
  Smile:        { icon: Smile,        label: '笑顔 / リラックス',     group: 'both' },
  Rocket:       { icon: Rocket,       label: 'ロケット / 挑戦',       group: 'both' },
  MessageCircle:{ icon: MessageCircle, label: '吹き出し / コメント',  group: 'both' },
  Laptop:       { icon: Laptop,       label: 'ノートPC / ウェブ',     group: 'both' },
  Bike:         { icon: Bike,         label: '自転車 / 近場',         group: 'both' },
  Activity:     { icon: Activity,     label: '運動 / 健康',           group: 'both' },
  Music:        { icon: Music,        label: '音楽 / 趣味',           group: 'both' },
  Meh:          { icon: Meh,          label: '無表情 / 普通',         group: 'both' },
  Frown:        { icon: Frown,        label: 'しかめ顔 / 反省',       group: 'both' },
  Terminal:     { icon: Terminal,     label: 'ターミナル / IT',        group: 'both' },
};

export const SCHEDULE_ICON_KEYS = Object.keys(ICONS).filter(k => ICONS[k].group === 'schedule' || ICONS[k].group === 'both');
export const TASK_ICON_KEYS     = Object.keys(ICONS).filter(k => ICONS[k].group === 'task'     || ICONS[k].group === 'both');

export default function TaskIcon({ name, size = 16, color, ...props }) {
  const { iconColors } = useTasks() || { iconColors: {} };
  
  if (!name || !ICONS[name]) return null;
  const IconComponent = ICONS[name].icon;
  
  const finalColor = iconColors[name] || color || 'currentColor';
  return <IconComponent size={size} color={finalColor} {...props} />;
}
