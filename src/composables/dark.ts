/**
 * ========================
 * Created with WebStorm.
 * @Author zqzess
 * @Date 2023/08/05 00:03
 * @File sift_client/dark.ts
 * @Version :
 * @Desc :
 * @GitHUb Https://github.com/zqzess
 * ========================
 **/
import { useDark, useToggle } from "@vueuse/core";

export const isDark = useDark();
export const toggleDark = useToggle(isDark);
