import { Help } from "@mui/icons-material";

export const KakoLoginHelp = () => (
    <div className="content content--narrow">
        <Help fontSize="inherit" />
        <p className="typography-note">
            {
                "카카오 로그인을 이용하면\n웹 링크를 잃어버려도 테스트 결과를 안전하게 불러올 수 있어요."
            }
        </p>
    </div>
)