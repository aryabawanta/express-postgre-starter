import { Model } from "sequelize";
import { UserInterface, UserCreate, UserRoles } from "../../interfaces";

module.exports = (sequelize: any, DataTypes: any) => {
  class users
    extends Model<UserInterface, UserCreate>
    implements UserInterface
  {
    public id!: string;
    public username!: string;
    public password!: string;
    public role!: typeof UserRoles[keyof typeof UserRoles];
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    static associate(models: any) {}
  }

  users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      timestamps: true,
      sequelize,
      modelName: "users",
      paranoid: true,
    }
  );

  return users;
};
