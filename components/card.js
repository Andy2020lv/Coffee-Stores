import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import cls from "classnames";
export default function Card(props) {
  return (
    <Link href={props.href}>
      <div className={cls("glass", styles.container)}>
        <h2 className={styles.cardHeader}>{props.name}</h2>
        <Image
          className={styles.cardImg}
          src={props.imgUrl}
          width={260}
          height={160}
        />
      </div>
    </Link>
  );
}
