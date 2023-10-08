const FILE_EXTENSIONS = [
  'document',
  'executable',
  'image',
  'zip',
  'dll',
  'unknown',
] as const;

const FILE_FOLDERS = [
  'document',
  'download',
  'empty-folder',
  'favorite',
  'folder',
  'home',
  'music',
  'one-drive',
  'picture',
  'video',
] as const;

const FILE_SYSTEMS = [
  'account',
  'bluetooth',
  'computer',
  'control-panel',
  'disk',
  'explorer',
  'network',
  'settings',
  'system-disk',
  'system',
  'trash-bin-empty',
  'trash-bin-full',
] as const;

export type ExtensionIcons = (typeof FILE_EXTENSIONS)[number];
export type FolderIcons = (typeof FILE_FOLDERS)[number];
export type SystemIcons = (typeof FILE_SYSTEMS)[number];

export type CombinedIcons = ExtensionIcons & FolderIcons & SystemIcons;

function load(name: ExtensionIcons): Promise<{ default: string }>;
function load(name: FolderIcons): Promise<{ default: string }>;
function load(name: SystemIcons): Promise<{ default: string }>;
function load(name: string): Promise<{ default: string }> {
  if (FILE_EXTENSIONS.includes(name as ExtensionIcons)) {
    // dynamic import with vite should follow two rules:
    // 1. start with relative path.
    // 2. end with file extension.
    return import(`../../assets/extensions/${name}.ico`);
  } else if (FILE_FOLDERS.includes(name as FolderIcons)) {
    return import(`../../assets/folders/${name}.ico`);
  } else if (FILE_SYSTEMS.includes(name as SystemIcons)) {
    return import(`../../assets/systems/${name}.ico`);
  } else {
    return import(`../../assets/${name}.ico`);
  }
}

export const iconConfigs = [
  {
    load,
    fileList: FILE_EXTENSIONS,
    iconType: 'extension',
  },
  {
    load,
    fileList: FILE_FOLDERS,
    iconType: 'folder',
  },
  {
    load,
    fileList: FILE_SYSTEMS,
    iconType: 'system',
  },
];
