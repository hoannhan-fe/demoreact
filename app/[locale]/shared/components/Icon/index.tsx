import iconHelper from './iconHelper';
import Icons from './icons';

export type IconName = keyof typeof Icons;

export default iconHelper(Icons);
