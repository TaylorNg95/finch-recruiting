"""changes recruit column name to next_touchpoint

Revision ID: 6b8d6f34c4b4
Revises: 4a8a92727f5b
Create Date: 2024-08-12 10:24:04.224244

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6b8d6f34c4b4'
down_revision = '4a8a92727f5b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recruits', schema=None) as batch_op:
        batch_op.add_column(sa.Column('next_touchpoint', sa.String(), nullable=True))
        batch_op.drop_column('nextTouchpoint')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recruits', schema=None) as batch_op:
        batch_op.add_column(sa.Column('nextTouchpoint', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('next_touchpoint')

    # ### end Alembic commands ###
