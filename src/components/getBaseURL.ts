
export default function getBase(a: string): string {
    return import.meta.env.BASE_URL + a
}
