use sea_orm::{
    ActiveModelTrait, ConnectionTrait, Database, DatabaseConnection, DbErr, DeleteMany,
    DeleteResult, EntityTrait, IntoActiveModel, PrimaryKeyTrait, Select,
};

pub async fn connect(url: &str) -> Result<DatabaseConnection, DbErr> {
    Database::connect(url).await
}

pub async fn insert<E, C>(db: &C, model: E::ActiveModel) -> Result<E::Model, DbErr>
where
    E: EntityTrait,
    C: ConnectionTrait,
    E::ActiveModel: ActiveModelTrait<Entity = E>,
    E::Model: IntoActiveModel<E::ActiveModel>,
{
    E::insert(model).exec_with_returning(db).await
}

pub async fn insert_many<E, C, I>(db: &C, models: I) -> Result<Vec<E::Model>, DbErr>
where
    E: EntityTrait,
    C: ConnectionTrait,
    E::ActiveModel: ActiveModelTrait<Entity = E>,
    E::Model: IntoActiveModel<E::ActiveModel>,
    I: IntoIterator<Item = E::ActiveModel>,
{
    E::insert_many(models).exec_with_returning(db).await
}

pub async fn get_by_id<E, C>(
    db: &C,
    id: <E::PrimaryKey as PrimaryKeyTrait>::ValueType,
) -> Result<Option<E::Model>, DbErr>
where
    E: EntityTrait,
    C: ConnectionTrait,
{
    E::find_by_id(id).one(db).await
}

pub async fn get_all<E, C>(db: &C) -> Result<Vec<E::Model>, DbErr>
where
    E: EntityTrait,
    C: ConnectionTrait,
{
    E::find().all(db).await
}

pub async fn get_one<E, C>(db: &C, query: Select<E>) -> Result<Option<E::Model>, DbErr>
where
    E: EntityTrait,
    C: ConnectionTrait,
{
    query.one(db).await
}

pub async fn get_many<E, C>(db: &C, query: Select<E>) -> Result<Vec<E::Model>, DbErr>
where
    E: EntityTrait,
    C: ConnectionTrait,
{
    query.all(db).await
}

pub async fn update<E, C>(db: &C, model: E::ActiveModel) -> Result<E::Model, DbErr>
where
    E: EntityTrait,
    C: ConnectionTrait,
    E::ActiveModel: ActiveModelTrait<Entity = E>,
    E::ActiveModel: std::marker::Send,
    E::Model: IntoActiveModel<E::ActiveModel>,
{
    model.update(db).await
}

pub async fn delete<E, C>(db: &C, model: E::ActiveModel) -> Result<DeleteResult, DbErr>
where
    E: EntityTrait,
    C: ConnectionTrait,
    E::ActiveModel: ActiveModelTrait<Entity = E>,
{
    E::delete(model).exec(db).await
}

pub async fn delete_by_id<E, C>(
    db: &C,
    id: <E::PrimaryKey as PrimaryKeyTrait>::ValueType,
) -> Result<DeleteResult, DbErr>
where
    E: EntityTrait,
    C: ConnectionTrait,
{
    E::delete_by_id(id).exec(db).await
}

pub async fn delete_many<E, C>(db: &C, query: DeleteMany<E>) -> Result<DeleteResult, DbErr>
where
    E: EntityTrait,
    C: ConnectionTrait,
{
    query.exec(db).await
}
