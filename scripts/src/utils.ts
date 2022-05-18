export const upperFirst = (str: string) => str[0].toUpperCase() + str.slice(1)
export const lowerFirst = (str: string) => str[0].toLowerCase() + str.slice(1)
export const MasterRegex = new RegExp(
  'public class (.*Master) : MasterBase(<.*, .*>)'
)
export const TypeRegex = new RegExp('public ([^ ]+) ([^ ]+) { get; set; }')
export const EnumRegex = new RegExp('public enum (\\w+)')
export const EnumMemberRegex = new RegExp('public const (.*?) (.*?) = (.*?);')
