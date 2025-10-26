import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  tip?: string;
  size?: "small" | "large" | "default";
  fullPage?: boolean;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function LoadingState({ tip = "Loading...", size = "default", fullPage = false }: Props) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <Spin indicator={antIcon} tip={tip} size={size} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <Spin indicator={antIcon} tip={tip} size={size} />
    </div>
  );
}