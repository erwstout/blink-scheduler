require("dotenv").config();
const Blink = require("node-blink-security");
const find = require("lodash/find");

exports.blinkToggle = (req: any, res: any) => {
  const blinkUser: string | undefined = process.env.BLINK_USERNAME;
  const blinkPassword: string | undefined = process.env.BLINK_PASSWORD;

  interface Main {
    urls: Object;
    _id: number;
    _name: string;
    _status: boolean;
    _enabled: boolean;
    _thumb: string;
    _clip: string;
    _temperature: number;
    _battery: number;
    _notifications: number;
    _motion: {};
    _header: string | null;
    _image_link: string | null;
    _arm_link: string | null;
    _updated_at: Date;
    _region_id: string;
    _wifi: string | null;
    _lfr: string | null;
    _network_id: string;
    setMotionDetect: (state: boolean) => void;
  }

  var blink = new Blink(blinkUser, blinkPassword);

  blink
    .setupSystem()
    .then(() => {
      const main: Main = find(
        blink.cameras,
        (camera: any) => camera._name === "Main"
      );
      const motionState: boolean = main._enabled;

      main.setMotionDetect(!motionState);
      return res.status(200).send(motionState);
    })
    .catch((err: Object) => {
      console.error(err);
      return res.sendStatus(500);
    });
};
